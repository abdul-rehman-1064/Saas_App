const Chatbot = require('../models/chatbot.model');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Get settings for Dashboard
exports.getSettings = async (req, res) => {
  try {
    const settings = await Chatbot.findOne({ userId: req.user.id });
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update settings from Dashboard
exports.updateSettings = async (req, res) => {
  try {
    const { businessName, supportEmail, knowledgeBase } = req.body;
    const settings = await Chatbot.findOneAndUpdate(
      { userId: req.user.id },
      { businessName, supportEmail, knowledgeBase },
      { new: true }
    );
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUBLIC API: Called by the Embed Widget
exports.chatWithAI = async (req, res) => {
  try {
    const { message, chatbotId } = req.body; // chatbotId is actually the User ID passed in script
    
    // Find the business details
    const config = await Chatbot.findOne({ userId: chatbotId });
    if (!config) return res.status(404).json({ message: "Bot not found" });

    // GEMINI AI INTEGRATION
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemma-3-4b-it"});

    // System Prompt setup
    const prompt = `
      You are a customer support AI for a business named "${config.businessName}".
      Strictly answer based ONLY on the following knowledge base:
      "${config.knowledgeBase}"
      
      If the answer is not in the context, say: "Please contact support at ${config.supportEmail}."
      User Question: ${message}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error("Gemini API Error:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ reply: "Sorry, I am having trouble connecting right now." });
  }
};