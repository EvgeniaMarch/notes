import { Note } from './notesListSlice';

export async function apiLoadNotes(): Promise<Note[]> {
  const response = await fetch('/api/notes');
  // console.log('response', response);
  if (!response.ok) {
    throw new Error((await response.json()).error);
  }

  return response.json();
}

export async function apiRemoveNote(id: string): Promise<void> {
  await fetch(`/api/notes/${id}`, { method: 'delete' });
}

export async function apiAddNote(
  note: Omit<Note, 'id' | 'updatedAt'>,
): Promise<Note> {
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

// export async function apiSearched(search='': string): Promise<Note[]> {
//   console.log('search', search);

//   const response = await fetch('/api/notes');
//   console.log('response', response);
//   if (!response.ok) {
//     throw new Error((await response.json()).error);
//   }
//   const notes = await response.json();
//   if (search === '') return notes;
//   else {
//     return notes.filter(
//       (note) =>
//         note.content.toLowerCase().includes(search) ||
//         note.title.toLowerCase().includes(search),
//       // note.categoryId === foundCategory?.id,
//     );
//   }
//   // return notes;
// }
