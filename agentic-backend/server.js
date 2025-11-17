// server.js
import express from "express";
import cors from "cors";
import ollama from "ollama";

const app = express();
const port = 5000;
const sessions = new Map();

// Middleware
app.use(cors()); // allow requests from frontend
app.use(express.json());

// POST /api/llama - sends prompt to Llama3 via Ollama
app.post("/api/llama", async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const response = await ollama.chat({
            model: "llama3",
            messages: [
                { role: "user", content: prompt }
            ]
        });

        // Send the response back to frontend
        res.json({ text: response.message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// GET /api/llama/stream - Server-Sent Events streaming tokens from Llama3 via Ollama
app.get("/api/llama/stream", async (req, res) => {
    try {
        const prompt = req.query.prompt;
        const sessionId = req.query.sessionId;

        if (!prompt || typeof prompt !== "string") {
            res.writeHead(400, {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            });
            res.write(`event: error\n`);
            res.write(`data: ${JSON.stringify({ error: "Prompt is required" })}\n\n`);
            return res.end();
        }

        if (!sessionId || typeof sessionId !== "string") {
            res.writeHead(400, {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            });
            res.write(`event: error\n`);
            res.write(`data: ${JSON.stringify({ error: "sessionId is required" })}\n\n`);
            return res.end();
        }

        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
            "Access-Control-Allow-Origin": "*",
        });

        const history = sessions.get(sessionId) || [];
        history.push({ role: "user", content: prompt });
        sessions.set(sessionId, history);

        const stream = await ollama.chat({
            model: "llama3",
            messages: history,
            stream: true,
        });

        let assistantText = "";
        for await (const part of stream) {
            const text = part?.message?.content ?? part?.response ?? "";
            if (text) {
                res.write(`data: ${JSON.stringify({ text })}\n\n`);
                assistantText += text;
            }
        }

        res.write(`event: done\n`);
        res.write(`data: {}\n\n`);
        if (assistantText) {
            const h = sessions.get(sessionId) || [];
            h.push({ role: "assistant", content: assistantText });
            sessions.set(sessionId, h);
        }
        res.end();
    } catch (error) {
        console.error(error);
        try {
            res.write(`event: error\n`);
            res.write(`data: ${JSON.stringify({ error: "Streaming failed" })}\n\n`);
            res.end();
        } catch (_) {
            res.status(500).json({ error: "Streaming failed" });
        }
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Ollama API server running at http://localhost:${port}`);
});
