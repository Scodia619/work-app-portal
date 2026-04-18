import styles from "./NotesCard.module.css";

type Note = {
  noteId: string;
  noteContent: string;
  createdAt: string;
  updatedAt: string;
};

type NotesCardProps = {
  note: Note;
};

export default function NotesCard({ note }: NotesCardProps) {
  return (
    <li className={styles.card}>
      <p>{note.noteContent}</p>

      <div className={styles.dates}>
        <small>
          Created: {new Date(note.createdAt).toLocaleString()}
        </small>
        <small>
          Updated: {new Date(note.updatedAt).toLocaleString()}
        </small>
      </div>
      
    </li>
  );
}