import { Note } from '../notesList/notesListSlice';
import { Category } from './categoriesListSlice';

export async function apiLoadCategories(): Promise<Category[]> {
  const response = await fetch('/api/categories');
  return response.json();
}

export async function apiLoadNotesFromCategory(id: string): Promise<Note[]> {
  const response = await fetch(`/api/categories/${id}/notes`);
  return response.json();
}

export async function apiAddCategory(category: Category): Promise<Category> {
  const response = await fetch(`/api/categories`, {
    method: 'post',
    body: JSON.stringify(category),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}
