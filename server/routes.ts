import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

export async function registerRoutes(app: Express): Promise<Server> {
  const pluginDir = path.join(process.cwd(), "plugin");
  const publicDir = path.join(process.cwd(), "public");
  
  app.use(cors({ origin: "*" }));
  
  app.use(
    "/plugin",
    express.static(pluginDir, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".js")) {
          res.setHeader("Content-Type", "application/javascript; charset=utf-8");
          res.setHeader("Access-Control-Allow-Origin", "*");
        }
      },
    })
  );

  app.get("/demo.html", (req, res) => {
    res.sendFile(path.join(publicDir, "demo.html"));
  });

  app.post("/api/generate-uml", express.json(), async (req, res) => {
    try {
      const { code } = req.body;
      
      if (!code) {
        return res.status(400).json({ error: "Code is required" });
      }

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that converts Python code into Mermaid class diagrams. Return ONLY the Mermaid diagram code without any markdown code blocks or explanations. Start directly with 'classDiagram'."
          },
          {
            role: "user",
            content: `Convert this Python code into a Mermaid class diagram:\n\n${code}`
          }
        ],
        temperature: 0.3,
      });

      const mermaidCode = completion.choices[0]?.message?.content || "";
      
      res.json({ mermaidCode });
    } catch (error) {
      console.error("Error generating UML:", error);
      res.status(500).json({ error: "Failed to generate UML diagram" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
