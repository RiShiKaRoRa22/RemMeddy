const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// SMS function (existing)
async function sendSms(to, body) {
  return await client.messages.create({
    body: body,
    from: process.env.TWILIO_SMS_FROM,
    to: to
  });
}

// WhatsApp function
async function sendWhatsApp(to, body) {
  return await client.messages.create({
    body: body,
    from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
    to: `whatsapp:${to}`
  });
}

// Phone Call function
async function makePhoneCall(to, message) {
  // Create dynamic TwiML that speaks the medication reminder
  const twiml = `
    <Response>
      <Say voice="alice">
        Hello! This is your medication reminder. 
        Time to take your medicine: ${message}.
        Thank you and stay healthy!
      </Say>
      <Pause length="2"/>
      <Say voice="alice">
        This was an automated reminder from MedReminder.
      </Say>
    </Response>
  `;

  return await client.calls.create({
    twiml: twiml,
    from: process.env.TWILIO_SMS_FROM,
    to: to,
    timeout: 30, // Wait 30 seconds for answer
    statusCallback: `${process.env.BASE_URL}/api/twilio/call-status`, // Optional: track call status
    statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed']
  });
}

module.exports = { sendSms, sendWhatsApp, makePhoneCall };