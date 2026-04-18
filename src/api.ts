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

export const getAllProjects = async (): Promise<Project[]> => {
  const res = await api.get<Project[]>("/projects");
  return res.data;
};