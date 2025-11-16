const Agenda = require('agenda');
const Reminder = require('../models/reminder');
const Medicine = require('../models/medicine');
const User = require('../models/user');
const ReminderLog = require('../models/reminderLog');
//const { sendSms } = require('./twilio');


let agenda = null;

async function initAgenda(mongoConnString) {
  agenda = new Agenda({
    db: { address: mongoConnString || process.env.MONGO_URI, collection: 'agendaJobs' },
    processEvery: '60 seconds', 
    timezone: 'Asia/Kolkata'
  });

  // Test job - runs every 30 seconds
  /*agenda.define('test-job', async (job) => {
    console.log(`✅ TEST JOB EXECUTED at ${new Date()}`);
  });*/

  // Instead of regex pattern, define a concrete job name pattern
/*agenda.define('reminder-job', {concurrency: 1,lockLifetime:1000}, async (job) => {
  console.log(`🎯 REMINDER JOB EXECUTED: ${job.attrs.name} at ${new Date()}`);
  
  try {
    const { reminderId } = job.attrs.data;
    console.log('Processing reminder ID:', reminderId);
    
    const reminder = await Reminder.findById(reminderId).populate('medicine');
    if (!reminder || !reminder.active) {
      console.log('Reminder not found or inactive');
      return;
    }

    const medicine = reminder.medicine;
    if (!medicine || !medicine.active) {
      console.log('Medicine not found or inactive');
      return;
    }

    const user = await User.findById(medicine.user);
    if (!user) {
      console.log('User not found');
      return;
    }

    const text = `Reminder:${user.name} Time to take ${medicine.name} ${medicine.dose ? `(${medicine.dose})` : ''}. ${medicine.notes || ''}`;
    const phoneWithCountryCode = `+91${user.phone}`;
    console.log(`Sending SMS to ${phoneWithCountryCode}: ${text}`);

    try {
    const res = await sendSms(phoneWithCountryCode, text);
    
      await ReminderLog.create({
        reminder: reminder._id,
        medicine: medicine._id,
        user: user._id,
        sentAt: new Date(),
        deliverySid: res.sid
      });
      console.log(`✅ SMS sent to ${user.phone} user ${user.name} for ${medicine.name}`);
    } catch (err) {
      console.error('❌ Twilio send error:', err.message);
    }
  } catch (err) {
    console.error('💥 Agenda job error:', err);
  }
}); */


const { sendSms, sendWhatsApp, makePhoneCall } = require('./twilio');

// Use concrete job name instead of regex pattern
agenda.define('reminder-job', { concurrency: 1, lockLifetime: 10000 }, async (job) => {
  console.log(`🎯 REMINDER JOB EXECUTED: ${job.attrs.name} at ${new Date()}`);
  
  try {
    const { reminderId } = job.attrs.data;
    console.log('Processing reminder ID:', reminderId);
    
    const reminder = await Reminder.findById(reminderId).populate('medicine');
    if (!reminder || !reminder.active) {
      console.log('Reminder not found or inactive');
      return;
    }

    const medicine = reminder.medicine;
    if (!medicine || !medicine.active) {
      console.log('Medicine not found or inactive');
      return;
    }

    const user = await User.findById(medicine.user);
    if (!user) {
      console.log('User not found');
      return;
    }

    const text = `Reminder: Time to take ${medicine.name} ${medicine.dose ? `(${medicine.dose})` : ''}. ${medicine.notes || ''}`;
    const phoneWithCountryCode = `+91${user.phone}`;
    console.log(`Sending ${reminder.notificationType} to ${phoneWithCountryCode}: ${text}`);

    try {
      let result;
      
      switch(reminder.notificationType) {
        case 'whatsapp':
          result = await sendWhatsApp(phoneWithCountryCode, text);
          break;
        case 'call':
          result = await makePhoneCall(phoneWithCountryCode, medicine.name, medicine.dose, medicine.notes);
          break;
        case 'sms':
        default:
          result = await sendSms(phoneWithCountryCode, text);
          break;
      }

      await ReminderLog.create({
        reminder: reminder._id,
        medicine: medicine._id,
        user: user._id,
        sentAt: new Date(),
        deliverySid: result.sid,
        notificationType: reminder.notificationType
      });
      
      console.log(`✅ ${reminder.notificationType.toUpperCase()} sent to ${user.phone} for ${medicine.name}`);
    } catch (err) {
      console.error(`❌ Twilio ${reminder.notificationType} error:`, err.message);
    }
  } catch (err) {
    console.error('💥 Agenda job error:', err);
  }
});
  await agenda.start();
  console.log('Agenda started');

  // Schedule test job to run every 30 seconds
  //await agenda.every('30 seconds', 'test-job');
  //console.log('Test job scheduled to run every 30 seconds');
}

function timeToCron(hhmm) {
  const [hh, mm] = hhmm.split(':').map(n => parseInt(n));
  return `${mm} ${hh} * * *`; // minute hour * * *
}

async function scheduleReminder(reminder) {
  if (!agenda) throw new Error('Agenda not initialized');

  const jobName = `reminder-${reminder._id}`;
  await agenda.cancel({ name: jobName });

  const cronExpr = timeToCron(reminder.time);
  console.log(`Creating DAILY JOB: ${jobName} at ${reminder.time}, cron: ${cronExpr}`);

  // Use agenda.every() instead of agenda.create() for simplicity
  await agenda.every(cronExpr, 'reminder-job', { reminderId: reminder._id });

  reminder.jobName = jobName;
  await reminder.save();
  
  console.log(`✅ Job scheduled successfully: ${jobName}`);
  
  // Verify job was created
  const jobs = await agenda.jobs({ name: jobName });
  console.log(`✅ Confirmed ${jobs.length} jobs scheduled`);
  if (jobs[0]) {
    console.log(`➡️ Next run: ${jobs[0].attrs.nextRunAt}`);
  }
}

async function cancelReminder(reminder) {
  if (!agenda) throw new Error('Agenda not initialized');
  if (!reminder.jobName) return;

  await agenda.cancel({ name: reminder.jobName });
  reminder.jobName = undefined;
  reminder.active = false;
  await reminder.save();
}

module.exports = { initAgenda, scheduleReminder, cancelReminder };
