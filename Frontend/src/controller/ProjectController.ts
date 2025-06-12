/**
 * DO NOT EDIT
 */
import type { IProject } from "../models/ProjectModels";

// Base API URL
const API_URL = 'http://localhost:3000/projects';

/**
 * Get all projects by sending a GET request to the API endpoint
 * 
 * @returns List of {@link IProject}
 */
export const getProjects = async(): Promise<IProject[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
        console.error("Failed to fetch projects", response);
        return [];

    }

    let res = await response.json();
    console.log("Fetch projects successful", res);
    return res;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

/**
 * Creates a new project by sending a POST request to the API endpoint
 * 
 * @param projectData The project data without the id
 * @returns The newly created project containing the generated id 
 */
export const createProject = async(projectData: Omit<IProject, 'id'>): Promise<IProject> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({project: projectData}),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create project');
    }
    
    let res = await response.json();
    console.log("Successfully created project!", res);
    return res;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};