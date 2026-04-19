import type { Project } from "../../Types/Project";
import styles from "../NotesCard/NotesCard.module.css";
import { useNavigate } from "react-router-dom";

type ProjectsCardProps = {
  project: Project;
};

export default function ProjectsCard({ project }: ProjectsCardProps) {
  
  const navigate = useNavigate();
  
  const openProject = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <li className={styles.card} onClick={() => openProject(project.projectId)}>
      <p>{project.projectName}</p>

      <div className={styles.dates}>
        <small>
          Created: {new Date(project.createdAt).toLocaleString()}
        </small>
      </div>
    </li>
  );
}