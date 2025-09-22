"use client";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "@mui/material";

interface Project {
  id: number;
  name: string;
  description: string;
  manager: string;
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "", manager: "" });
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [editingProject, setEditingProject] = useState({ name: "", description: "", manager: "" });
  const [sortConfig, setSortConfig] = useState<{ key: keyof Project; direction: "asc" | "desc" } | null>(null);

  // Dummy data
  useEffect(() => {
    const dummy: Project[] = [
      { id: 1, name: "Website Redesign", description: "Revamp website UI", manager: "Alice" },
      { id: 2, name: "Mobile App", description: "New mobile app project", manager: "Bob" },
      { id: 3, name: "Marketing Campaign", description: "Social media campaign", manager: "Charlie" },
    ];
    setProjects(dummy);
    setFilteredProjects(dummy);
  }, []);

  // Search
  useEffect(() => {
    const filtered = projects.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.manager.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [search, projects]);

  // Sort
  const handleSort = (key: keyof Project) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredProjects].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredProjects(sorted);
  };

  // Create project
  const handleCreate = () => {
    if (!newProject.name || !newProject.description || !newProject.manager) return;
    const id = projects.length ? projects[projects.length - 1].id + 1 : 1;
    const newProjectData = { id, ...newProject };
    const updatedProjects = [...projects, newProjectData];
    setProjects(updatedProjects);
    setFilteredProjects(updatedProjects);
    setNewProject({ name: "", description: "", manager: "" });
    setIsModalOpen(false);
  };

  // Update project
  const handleUpdate = (id: number) => {
    const updatedProjects = projects.map((p) =>
      p.id === id ? { ...p, ...editingProject } : p
    );
    setProjects(updatedProjects);
    setFilteredProjects(updatedProjects);
    setEditingProjectId(null);
    setEditingProject({ name: "", description: "", manager: "" });
  };

  // Delete project
  const handleDelete = (id: number) => {
    const updatedProjects = projects.filter((p) => p.id !== id);
    setProjects(updatedProjects);
    setFilteredProjects(updatedProjects);
  };

const SortArrow = ({ columnKey }: { columnKey: keyof Project }) => {
  if (!sortConfig) return <span className="text-gray-300">▲</span>;

  if (sortConfig.key !== columnKey) return <span className="text-gray-300">▲</span>; 

  return sortConfig.direction === "asc" ? <span>▲</span> : <span>▼</span>;
};

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <input
          style={{ border: "1px solid rgba(0,0,0,.3)" }}
          type="text"
          placeholder="Search projects..."
          className="outline-0 p-2 rounded w-[250px] text-[12px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button sx={{background:"#176e6d"}} size="small" variant="contained" onClick={() => setIsModalOpen(true)}>
          Create Project
        </Button>
      </div>

      {/* Projects Table */}
      <div className="overflow-x-auto table-responsive">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              {["id", "name", "description", "manager"].map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 text-left cursor-pointer"
                  onClick={() => handleSort(key as keyof Project)}
                >
                  {key.toUpperCase()}
                  <SortArrow columnKey={key as keyof Project} />
                </th>
              ))}
              <th className="px-4 py-2 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                {editingProjectId === p.id ? (
                  <>
                    <td className="px-4 py-2">
                      <input
                        style={{ border: "1px solid rgba(0,0,0,.3)", width: "200px", outline: "none" }}
                        className="p-1 rounded"
                        value={editingProject.name}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, name: e.target.value })
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        style={{ border: "1px solid rgba(0,0,0,.3)", width: "250px", outline: "none" }}
                        className="p-1 rounded"
                        value={editingProject.description}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, description: e.target.value })
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        style={{ border: "1px solid rgba(0,0,0,.3)", width: "150px", outline: "none" }}
                        className="p-1 rounded"
                        value={editingProject.manager}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, manager: e.target.value })
                        }
                      />
                    </td>
                    <td className="px-4 py-2 text-end space-x-2">
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => handleUpdate(p.id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                        onClick={() => setEditingProjectId(null)}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">{p.description}</td>
                    <td className="px-4 py-2">{p.manager}</td>
                    <td className="px-4 py-2 text-end space-x-2">
                      <button
                        onClick={() => {
                          setEditingProjectId(p.id);
                          setEditingProject({
                            name: p.name,
                            description: p.description,
                            manager: p.manager,
                          });
                        }}
                      >
                        <i className="ri-edit-fill text-yellow-500 cursor-pointer text-[16px]"></i>
                      </button>
                      <button onClick={() => handleDelete(p.id)}>
                        <i className="ri-delete-bin-5-fill text-red-500 text-[16px] cursor-pointer"></i>
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Create Project</h2>
            <input
              style={{ border: "1px solid rgba(0,0,0,.3)", outline: "none" }}
              type="text"
              placeholder="Project Name"
              className="border p-2 rounded w-full mb-2 text-[12px]"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />
            <input
              style={{ border: "1px solid rgba(0,0,0,.3)", outline: "none" }}
              type="text"
              placeholder="Description"
              className="border p-2 rounded w-full mb-2 text-[12px]"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
            <input
              style={{ border: "1px solid rgba(0,0,0,.3)", outline: "none" }}
              type="text"
              placeholder="Manager"
              className="border p-2 rounded w-full mb-4 text-[12px]"
              value={newProject.manager}
              onChange={(e) => setNewProject({ ...newProject, manager: e.target.value })}
            />
            <div className="flex gap-2 justify-end">
              <Button
                size="small"
                variant="outlined"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                className="text-[12px]"
                onClick={handleCreate}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectsPage;
