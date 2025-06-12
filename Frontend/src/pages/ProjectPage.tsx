import React, { useState, type FormEvent } from "react";
import { Eye, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../controller/ProjectController";

export const ProjectPage: React.FC = () => {
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const navigate = useNavigate();

  /**
   * Submits the form to create the project
   *
   * @param event The form event
   */
  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!projectName.trim() || !projectDescription.trim()) {
      alert("Error: Project Name and Description cannot be empty.");
      return;
    }

    try {
      const projectData = {
        name: projectName,
        description: projectDescription,
      };
      const response = await createProject(projectData);
      if (response.id) {
        alert("Successfully created project");
        navigate("/project-details");
      } else {
        alert("Error: Failed to create project");
      }
    } catch (error) {
      alert("Error: Failed to create project");
      console.error(error);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {/* Centered Content Container */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-xl w-full">
          {/* Project Creation Form */}
          <form onSubmit={onSubmit}>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold">
                Begin your Project Journey
              </h1>
            </div>

            <div className="space-y-4">
              {/* Project Name */}
              <div className="bg-gray-100 rounded-md p-3 flex items-center justify-between">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Project Name
                  </label>
                  <input
                    type="text"
                    className="bg-transparent w-full border-none focus:outline-none"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <Eye className="h-5 w-5 text-gray-500" />
              </div>

              {/* Project Description */}
              <div className="bg-gray-100 rounded-md p-3 flex items-start justify-between">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Project Description
                  </label>
                  <textarea
                    rows={3}
                    className="bg-transparent w-full border-none focus:outline-none"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </div>
                <FileText className="h-5 w-5 text-gray-500 mt-1" />
              </div>

              {/* Create Project Button */}
              <input
                className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors cursor-pointer"
                type="submit"
                value="Create Project"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
