import { useEffect, useState } from "react";
import NotesCard from "../NotesCard/NotesCard";
import styles from './NotesList.module.css'
import { getAllNotes, getAllNotesByProjectId } from "../../api";
import type { Note } from "../../Types/Note";
import AddNoteCard from "../AddNotesCard/AddNotesCard";
import CreateNoteModal from "../../Modals/CreateNotesModal/CreateNotesModal";

type NotesListProps = {
  projectId?: string
};

export default function NotesList({projectId}: NotesListProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
  const fetchNotes = async () => {
    try {
      if(projectId == null){
        const data = await getAllNotes();
        setNotes(data)
      }else{
        const data = await getAllNotesByProjectId(projectId);
        setNotes(data);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
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
        <>
          <p>No notes found.</p>
          <ul className={styles.list}>
            <AddNoteCard onClick={() => setIsModalOpen(true)}/>
          </ul>
        </>
      ) : (
        <ul className={styles.list}>
            <AddNoteCard onClick={() => setIsModalOpen(true)}/>
            {notes.map((note) => (
                <NotesCard key={note.noteId} note={note} />
            ))}
        </ul>
      )}

      <CreateNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setNotes={setNotes}
      />
    </div>
  );
}