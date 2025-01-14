// const viewedNotes = useMemo(() => {
//     const foundCategory = allCategories.find(
//       (category) =>
//         searchedByCategory &&
//         category.name.toLowerCase().includes(searchedByCategory),
//     );

import { RootState, useAppSelector } from '../store/store';
import { Note } from '../features/notesList/notesListSlice';

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

function useGetViewedNotes({
  orderedNotes,
  searchedByCategory,
  searchedByName,
}: {
  orderedNotes: 0 | Note[] | undefined;
  searchedByCategory: string | null;
  searchedByName: string | null;
}) {
  const allCategories = useAppSelector(
    (state: RootState) => state.categories.categoriesList,
  );

  const foundCategory = allCategories.find(
    (category) =>
      searchedByCategory &&
      category.name.toLowerCase().includes(searchedByCategory),
  );
  // todo simplify
  return (
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
    })
  );
}

export default useGetViewedNotes;
