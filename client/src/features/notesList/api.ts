import { Note } from './notesListSlice';

export async function apiLoadNotes(): Promise<Note[]> {
  const response = await fetch('/api/notes');
  return response.json();
}

export async function apiRemoveNote(id: string): Promise<void> {
  await fetch(`/api/notes/${id}`, { method: 'delete' });
}

export async function apiAddNote(note: Note): Promise<Note> {
  console.log('apiAddNote', note);

  const response = await fetch(`/api/notes`, {
    method: 'post',
    body: JSON.stringify({ ...note }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function apiEditNote(note: Note): Promise<Note> {
  const response = await fetch(`/api/notes/${note.id}`, {
    method: 'put',
    body: JSON.stringify(note),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export async function apiLoadNotesFromCategory(id: string): Promise<Note[]> {
  const response = await fetch(`/api/categories/${id}/notes`);
  return response.json();
}
