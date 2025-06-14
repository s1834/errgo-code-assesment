import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, { message: "Project name is required" }),
  description: z
    .string({ required_error: "Project description is required" })
    .min(1, { message: "Project description cannot be empty" }),
});

export interface IProject {
  id: number;
  name: string;
  description: string;
}
