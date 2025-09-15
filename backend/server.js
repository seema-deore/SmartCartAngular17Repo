import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();

// ✅ Configure CORS properly
app.use(cors({
  origin: "http://localhost:4200",  // allow Angular frontend
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}); 
console.log("API KEY:", process.env.OPENAI_API_KEY ? "Loaded ✅" : "Not Found ❌");

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userMessage }],
    });

    const aiResponse = completion.choices[0].message.content;
    res.json({ reply: aiResponse });
  } catch (error) {
    console.error("🔥 Chat API Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

