import express from "express";
import cors from "cors";
import { IProject } from "./models/project.interface";
import { v4 as uuid } from "uuid";

const app = express();
const PORT = 3000;
// List of projects
const projects: IProject[] = [];

// Setup cors and express.json()
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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.post("/projects", (req, res) => {
  const { project } = req.body;

  if (!project || !project.name || !project.description) {
    res
      .status(400)
      .json({ error: "Project data with name and description is required" });
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
    name: project.name,
    description: project.description,
  };

  projects.push(newProject);
  res.status(200).json(newProject);
});

app.get("/projects", (req, res) => {
  res.status(200).json(projects);
});
