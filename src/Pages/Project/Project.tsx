import { useParams } from "react-router-dom";
import styles from './Project.module.css';

import NotesList from "../../Components/NotesList/NotesList";
import { useEffect, useState } from "react";
import type { Project } from "../../Types/Project";
import { getProjectById } from "../../api";

export default function ProjectsPage() {

  const { projectId } = useParams<{ projectId: string }>();

  const [project, setProjects] = useState<Project>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchProjects = async () => {
        try {
          const data = await getProjectById(projectId);
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
    <div className={styles.main}>
      <h1>Project: {project?.projectName}</h1>
      <NotesList projectId={projectId}/>
    </div>
  );
}