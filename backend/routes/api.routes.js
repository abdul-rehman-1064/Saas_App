const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const chatbotController = require('../controllers/chatbot.controller');
const jwt = require('jsonwebtoken');

// Middleware for protected routes
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('A token is required');
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
};

// Auth
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Dashboard (Protected)
router.get('/chatbot/settings', verifyToken, chatbotController.getSettings);
router.put('/chatbot/settings', verifyToken, chatbotController.updateSettings);

// Public Widget Route (No Auth required, used by external sites)
router.post('/widget/chat', chatbotController.chatWithAI);

module.exports = router;