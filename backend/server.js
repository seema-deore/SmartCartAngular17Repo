import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:4200" }));
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Send request to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const reply = response.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start server

app.listen(5000, () => console.log("✅ Server running at http://localhost:5000"));