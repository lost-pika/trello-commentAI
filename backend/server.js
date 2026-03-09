import express from "express";
import cors from "cors";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

/*
ENDPOINT
Generate AI response
*/

app.post("/generate", upload.array("screenshots"), async (req, res) => {

    try {

        const { prompt, apiKey } = req.body;

        if (!apiKey)
            return res.status(400).json({ error: "Missing API key" });

        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });

        const parts = [
            {
                text: `
You are an assistant that converts rough developer comments
into clean Trello card comments.

Rules:
- Make the comment clear
- Friendly tone
- Structured
- Easy to understand
- Suggest improvements if needed

User Input:
${prompt}
`
            }
        ];

        /*
        Add screenshots if provided
        */

        if (req.files && req.files.length > 0) {

            req.files.forEach(file => {

                parts.push({
                    inlineData: {
                        data: file.buffer.toString("base64"),
                        mimeType: file.mimetype
                    }
                });

            });

        }

        const result = await model.generateContent(parts);

        const text = result.response.text();

        res.json({ text });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "AI generation failed"
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});