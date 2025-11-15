const mongoose = require('mongoose');


const ReminderLogSchema = new mongoose.Schema({
reminder: { type: mongoose.Schema.Types.ObjectId, ref: 'Reminder' },
medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
sentAt: Date,
deliverySid: String,
confirmed: { type: Boolean, default: false },
confirmedAt: Date,
note: String
});


module.exports = mongoose.model('ReminderLog', ReminderLogSchema);