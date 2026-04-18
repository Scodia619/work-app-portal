import type { Project } from "../../Types/Project";
import styles from "../NotesCard/NotesCard.module.css";

type ProjectsCardProps = {
  project: Project;
};

export default function ProjectsCard({ project }: ProjectsCardProps) {
  return (
    <li className={styles.card}>
      <p>{project.projectName}</p>

      <div className={styles.dates}>
        <small>
          Created: {new Date(project.createdAt).toLocaleString()}
        </small>
      </div>
      
    </li>
  );
}