// const viewedNotes = useMemo(() => {
//     const foundCategory = allCategories.find(
//       (category) =>
//         searchedByCategory &&
//         category.name.toLowerCase().includes(searchedByCategory),
//     );

import { RootState, useAppSelector } from '../store/store';
import { Note } from '../features/notesList/notesListSlice';
import { useMemo, useState } from 'react';

//     // todo simplify
//     return (
//       Array.isArray(orderedNotes) &&
//       orderedNotes.filter((note) => {
//         if (searchedByName && !searchedByCategory) {
//           return (
//             note.content.toLowerCase().includes(searchedByName) ||
//             note.title.toLowerCase().includes(searchedByName)
//           );
//         }
//         if (searchedByName && searchedByCategory) {
//           return (
//             (note.content.toLowerCase().includes(searchedByName) ||
//               note.title.toLowerCase().includes(searchedByName)) &&
//             note.categoryId === foundCategory?.id
//           );
//         }
//         if (!searchedByName && searchedByCategory) {
//           return note.categoryId === foundCategory?.id;
//         }
//         if (!searchedByName && !searchedByCategory) {
//           return note;
//         }
//       })
//     );
//   }, [allCategories, orderedNotes, searchedByCategory, searchedByName]);

function useNotesStore({
  allNotes,
}: // searchedByCategory,
// searchedByName,
{
  allNotes: 0 | Note[] | undefined;
  // searchedByCategory: string | null;
  // searchedByName: string | null;
}) {
  const [searchedByName, setSearchedByName] = useState<string | null>(null);
  const [searchedByCategory, setSearchedByCategory] = useState<string | null>(
    null,
  );
  const orderedNotes = useMemo(
    () =>
      allNotes &&
      allNotes.length &&
      // todo update typescript?
      allNotes.toSorted((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
      }),
    [allNotes],
  );
  const allCategories = useAppSelector(
    (state: RootState) => state.categories.categoriesList,
  );

  const foundCategory = allCategories.find(
    (category) =>
      searchedByCategory &&
      category.name.toLowerCase().includes(searchedByCategory),
  );
  // todo simplify

  const viewedNotes =
    Array.isArray(orderedNotes) &&
    orderedNotes.filter((note) => {
      if (searchedByName && !searchedByCategory) {
        return (
          note.content.toLowerCase().includes(searchedByName) ||
          note.title.toLowerCase().includes(searchedByName)
        );
      }
      if (searchedByName && searchedByCategory) {
        return (
          (note.content.toLowerCase().includes(searchedByName) ||
            note.title.toLowerCase().includes(searchedByName)) &&
          note.categoryId === foundCategory?.id
        );
      }
      if (!searchedByName && searchedByCategory) {
        return note.categoryId === foundCategory?.id;
      }
      if (!searchedByName && !searchedByCategory) {
        return note;
      }
    });
  return {
    viewedNotes,
    searchedByName,
    setSearchedByName,
    searchedByCategory,
    setSearchedByCategory,
  };
}

export default useNotesStore;
