const Twilio = require('twilio');
const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


async function sendSms(to, body) {
return client.messages.create({ body, from: process.env.TWILIO_SMS_FROM, to });
}


async function sendWhatsapp(to, body) {
return client.messages.create({ body, from: process.env.TWILIO_WHATSAPP_FROM, to: `whatsapp:${to}` });
}


module.exports = { sendSms, sendWhatsapp };