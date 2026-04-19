import { useEffect, useState } from "react";
import { createNote, getAllProjects } from "../../api";
import type { Project } from "../../Types/Project";
import type { Note } from "../../Types/Note";
import styles from './CreateNotesModal.module.css';
import {X} from 'lucide-react';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

export default function CreateNoteModal({ isOpen, onClose, setNotes }: Props) {

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [projectId, setProjectId] = useState<string | null>(null);
    const [noteContent, setNoteContent] = useState("");


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

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newNote = await createNote(noteContent, projectId)

    setNotes((prev) => [newNote, ...prev]);

    onClose()
    setNoteContent("");
    setProjectId(null);
  };
 

    if (!isOpen) return null;

    if (loading) return <p>Loading notes...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>Create Note</h2>
                    <X onClick={onClose} className={styles.closeBtn}/>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

                    <div>
                        <label htmlFor="project">Project</label>
                        <select
                            id="project"
                            value={projectId ?? ""}
                            onChange={(e) => setProjectId(e.target.value || null)}
                            className={styles.dropdown}
                        >
                            <option value="">General</option>
                            {projects.map((project) => (
                                <option key={project.projectId} value={project.projectId}>
                                    {project.projectName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.noteContent}>
                        <label htmlFor="noteContent">Note</label>
                        <textarea
                            id="noteContent"
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                            placeholder="Write your note..."
                            rows={5}
                        />
                    </div>

                    <button type="submit" className={styles.submit}>
                        Create Note
                    </button>

                </form>
            </div>
        </div>
    );
}