const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  time: String, // HH:MM
  jobName: String,
  active: { type: Boolean, default: true },
  notificationType: { 
    type: String, 
    enum: ['sms', 'whatsapp', 'call'], 
    default: 'sms' 
  },
  phone: String // Store phone for notifications
}, { timestamps: true });

module.exports = mongoose.model('Reminder', ReminderSchema);