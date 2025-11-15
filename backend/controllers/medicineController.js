const Medicine = require('../models/medicine');
const Reminder = require('../models/reminder');
const ReminderLog = require('../models/reminderLog');
const { scheduleReminder, cancelReminder } = require('../services/scheduler');

exports.addMedicine = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, dose, notes, schedule } = req.body;
    // expect schedule.times = ["HH:MM","HH:MM"]
    const med = await Medicine.create({ user: userId, name, dose, notes, schedule });
    const reminders = [];
    for (const time of (schedule.times || [])) {
      const rem = await Reminder.create({ medicine: med._id, time });
      reminders.push(rem);
      await scheduleReminder(rem);
    }
    res.status(201).json({ medicine: med, reminders });
  } catch (err) {
    next(err);
  }
};

exports.getMedicines = async (req, res, next) => {
  try {
    const meds = await Medicine.find({ user: req.user.id });
    res.json(meds);
  } catch (err) {
    next(err);
  }
};

exports.getLogs = async (req, res, next) => {
  try {
    const logs = await ReminderLog.find({ user: req.user.id }).populate('medicine reminder');
    res.json(logs);
  } catch (err) {
    next(err);
  }
};

exports.markTaken = async (req, res, next) => {
  try {
    const { logId } = req.params;
    const log = await ReminderLog.findById(logId);
    if (!log) return res.status(404).json({ message: 'Log not found' });
    if (String(log.user) !== String(req.user.id)) return res.status(403).json({ message: 'Forbidden' });
    log.confirmed = true;
    log.confirmedAt = new Date();
    await log.save();
    res.json(log);
  } catch (err) {
    next(err);
  }
};

exports.removeMedicine = async (req, res, next) => {
  try {
    const medId = req.params.id;
    const med = await Medicine.findById(medId);
    if (!med) return res.status(404).json({ message: 'Not found' });
    const reminders = await Reminder.find({ medicine: med._id });
    for (const r of reminders) {
      await cancelReminder(r);
      r.active = false;
      await r.save();
    }
    await Medicine.findByIdAndDelete(medId);

    res.json({ message: 'Medicine stopped' });
  } catch (err) {
    next(err);
  }
};
