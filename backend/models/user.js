const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
name: String,
phone: { type: String, required: true, unique: true },
passwordHash: { type: String, required: true },
role: { type: String, default: 'user' }
});


UserSchema.methods.comparePassword = function(password) {
return bcrypt.compare(password, this.passwordHash);
};


module.exports = mongoose.model('User', UserSchema);