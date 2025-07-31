// controllers/aiController.js

import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function 1: Generate Note Content (for /generate-note route)
export const generateNoteContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Use a current, available model name
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (err) {
    console.error("Gemini Error in generateNoteContent:", err);
    res.status(500).json({ error: "Failed to generate note content from Gemini" });
  }
};

// Function 2: Alternative Gemini Route (for /ai/gemini)
export const generateFromGemini = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // In generateFromGemini function
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (err) {
    console.error("Gemini Error in generateFromGemini:", err);
    res.status(500).json({ error: "Failed to generate content from Gemini" });
  }
};
