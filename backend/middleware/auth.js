const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) throw new Error('No token provided');

    console.log("Token received:", token); // Debug log

    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debug log

    const user = await User.findById(decoded.userId);
    if (!user) throw new Error('User not found');

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    res.status(401).json({ error: err.message });
  }
};

module.exports = auth;