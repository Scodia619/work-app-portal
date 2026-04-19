import styles from '../NotesCard/NotesCard.module.css'

type Props = {
  onClick: () => void;
};

export default function AddNoteCard({ onClick }: Props) {

  return (
    <div
      onClick={onClick}
      className={styles.card}
    >
      <h3>➕ Create Note</h3>
      <p>Click to add a new note</p>
    </div>
  );
}