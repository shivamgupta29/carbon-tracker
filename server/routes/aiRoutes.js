const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// @desc    Generate a personalized insight using AI
// @route   POST /api/ai/generate-insight
// @access  Private (should be protected)
router.post("/generate-insight", async (req, res) => {
  try {
    //Get data from the frontend
    const { summary, userName } = req.body;

    // Basic validation
    if (!summary || summary.length === 0) {
      return res.status(400).json({ message: "Summary data is required." });
    }

    // Initialize the Google AI SDK
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    // Create a detailed prompt
    const summaryString = summary
      .map((item) => `${item.type}: ${item.totalCO2.toFixed(2)} kg CO₂`)
      .join(", ");
    const prompt = `You are a friendly and encouraging environmental coach. A user named ${
      userName || "there"
    } has the following carbon footprint data for today: ${summaryString}. Based on this data, write a short, personalized, and encouraging tip (1-2 sentences) to help them reduce their emissions. Address them directly. Be positive and motivational, not scolding.`;

    // Call the AI model and get the result
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Send the AI's generated text back to the frontend
    res.json({ insight: text });
  } catch (error) {
    console.error("Error in /generate-insight:", error);
    res.status(500).json({ message: "Failed to generate AI insight." });
  }
});

module.exports = router;
