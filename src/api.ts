import axios from 'axios'
import type { Note } from './Types/Note';
import type { Project } from './Types/Project';

const api = axios.create({
    baseURL: 'https://localhost:7206/api'
})

export const getAllNotes = async (): Promise<Note[]> => {
  const res = await api.get<Note[]>("/notes");
  return res.data;
};

export const getAllNotesByProjectId = async (projectId: string): Promise<Note[]> => {
  const res = await api.get<Note[]>(`/notes/GetNotesByProjectId?projectId=${projectId}`);
  return res.data;
};

export const getAllProjects = async (): Promise<Project[]> => {
  const res = await api.get<Project[]>("/projects");
  return res.data;
};

export const getProjectById = async (projectId?: string): Promise<Project> => {
  const res = await api.get<Project>(`/projects/${projectId}`);
  return res.data;
};

export const createNote = async (noteContent: string, projectId?: string | null) => {
  const response = await api.post("/notes", {
    noteContent,
    projectId
  });

  return response.data;
};