const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    const { name, phone, password, timezone } = req.body;
    if (!phone || !password) return res.status(400).json({ message: 'phone & password required' });

    const exists = await User.findOne({ phone });
    if (exists) return res.status(409).json({ message: 'User exists' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, phone, passwordHash: hash, timezone });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
