import { useEffect, useState } from "react";
import NotesCard from "../NotesCard/NotesCard";
import styles from './NotesList.module.css'

type Note = {
  noteId: string;
  noteContent: string;
  createdAt: string;
  updatedAt: string;
};

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("https://localhost:7206/api/notes");

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data: Note[] = await response.json();
        setNotes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) return <p>Loading notes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={styles.container}>
      <h2>Notes</h2>

      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <ul className={styles.list}>
            {notes.map((note) => (
                <NotesCard key={note.noteId} note={note} />
            ))}
        </ul>
      )}
    </div>
  );
}