import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static("."));

app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024"
    })
  });

  const data = await response.json();
  res.json({ image: data.data[0].url });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
