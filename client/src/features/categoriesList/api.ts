import { Note } from '../notesList/notesListSlice';
import { Category } from './categoriesListSlice';

// export async function apiLoadCategories() {
//   const response = await fetch('/api/categories');
//   const result = await response.json();
//   return new Promise<void>((resolve) => {
//     setTimeout(() => {
//       resolve(result);
//     }, 2000);
//   });
// }

export async function apiLoadCategories() {
  const response = await fetch('/api/categories');
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result);
  }

  // await new Promise((r) => setTimeout(r, 2000));

  return result;
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
