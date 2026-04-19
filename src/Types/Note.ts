export type Note = {
  noteId: string;
  createdAt: string;
  updatedAt: string;
  noteContent: string;
  projectId?: string;
  projectName?: string;
};