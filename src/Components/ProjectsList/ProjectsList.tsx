import { useEffect, useState } from "react";
import styles from '../NotesList/NotesList.module.css'
import {getAllProjects } from "../../api";
import type { Project } from "../../Types/Project";
import ProjectsCard from "../ProjectsCard/ProjectsCard";

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  
  if (loading) return <p>Loading notes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={styles.container}>
      <h2>Projects</h2>

      {projects.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <ul className={styles.list}>
            {projects.map((project) => (
                <ProjectsCard key={project.projectId} project={project} />
            ))}
        </ul>
      )}
    </div>
  );
}