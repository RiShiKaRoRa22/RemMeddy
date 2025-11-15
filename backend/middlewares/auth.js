const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No auth' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: 'Invalid' });
    req.user = { id: user._id, phone: user.phone, timezone: user.timezone };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
