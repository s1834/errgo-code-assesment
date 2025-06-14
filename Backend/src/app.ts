import express from "express";
import cors from "cors";
import { IProject, projectSchema } from "./models/project.interface";
import { v4 as uuid } from "uuid";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { z } from "zod";

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

const PORT = 3000;
const projects: IProject[] = [];
let chatMessages: string[] = [];

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Errgo Backend Interview Module Loaded Successfully!");
});

app.post("/projects", (req, res) => {
  const { project } = req.body;

  const validation = projectSchema.safeParse(project);
  if (!validation.success) {
    res.status(400).json({ error: validation.error.format() });
    return;
  }

  const uuidString = uuid();
  let hash = 0;
  for (let i = 0; i < uuidString.length; i++) {
    hash = hash * 31 + uuidString.charCodeAt(i);
    hash = hash >>> 0;
  }

  const newProject: IProject = {
    id: hash,
    name: validation.data.name,
    description: validation.data.description,
  };

  projects.push(newProject);
  res.status(200).json(newProject);
});

app.get("/projects", (req, res) => {
  res.status(200).json(projects);
});

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ type: "history", messages: chatMessages }));

  ws.on("message", (message) => {
    const msgStr = message.toString();
    chatMessages.push(msgStr);

    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({ type: "new_message", message: msgStr }));
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
