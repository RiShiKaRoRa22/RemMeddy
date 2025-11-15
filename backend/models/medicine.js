const mongoose = require('mongoose');


const MedicineSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
name: { type: String, required: true },
dose: String,
notes: String,
schedule: {
times: [String], // HH:MM
startDate: Date,
endDate: Date
},
createdAt: { type: Date, default: Date.now },
active: { type: Boolean, default: true }
});


module.exports = mongoose.model('Medicine', MedicineSchema);