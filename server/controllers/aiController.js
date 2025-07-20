// controllers/aiController.js
import { OpenAI } from 'openai';
import asyncHandler from 'express-async-handler';

// Initialize OpenAI with your API key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Controller to generate note content
const generateNoteContent = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    res.status(400);
    throw new Error('Prompt is required');
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. Based on the user's request, generate a concise, well-structured note. Use markdown for formatting if appropriate."
        },
        {
          role: "user",
          content: prompt
        }
      ],
    });

    const noteContent = completion.choices[0].message.content;
    res.status(200).json({ content: noteContent.trim() });

  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500);
    throw new Error('Failed to generate note from AI service.');
  }
});

export { generateNoteContent };