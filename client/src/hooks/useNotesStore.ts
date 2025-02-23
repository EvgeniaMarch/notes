import { useMemo, useState } from 'react';
import { useLoadNotesQuery } from '../features/notesList/notesListApi';
import { useParams } from 'react-router-dom';
import { useLoadCategoriesQuery } from '../features/categoriesList/categoriesListApi';

function useNotesStore() {
  const { id } = useParams();
  const { data: allNotes } = useLoadNotesQuery(id);
  const { data: allCategories } = useLoadCategoriesQuery();
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

  const foundCategory = allCategories?.find(
    (category) =>
      searchedByCategory &&
      category.name.toLowerCase().includes(searchedByCategory),
  );

  const viewedNotes =
    Array.isArray(orderedNotes) &&
    // todo important simplify
    // это можно написать так (note) => а дальше одно большое выражение, которое возвращает true или false
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
