import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config.js";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate-logo", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "256x256",
    });
    const imageUrl = response.data[0].url;
    res.json({ url: imageUrl });
  } catch (err) {
    console.error("Error generating image:", err);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
