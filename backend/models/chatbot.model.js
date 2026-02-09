const mongoose = require('mongoose');

const chatbotSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  businessName: { type: String, default: 'My Business' },
  supportEmail: { type: String },
  knowledgeBase: { type: String, default: '' }, // User yahan apni policies likhega
}, { timestamps: true });

module.exports = mongoose.model('Chatbot', chatbotSchema);