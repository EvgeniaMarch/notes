import { useMemo, useState } from 'react';
import {
  useFindNotesQuery,
  useLoadNotesQuery,
} from '../features/notesList/notesListApi';
import { useParams } from 'react-router-dom';

function useNotesStore() {
  const { id } = useParams();
  const [searchedByName, setSearchedByName] = useState<string | null>(null);
  const { data: allNotes, isLoading: isLoadingNotes } = useLoadNotesQuery(id);
  // const { data: allCategories } = useLoadCategoriesQuery();
  // const [searchedByCategory, setSearchedByCategory] = useState<string | null>(
  //   null,
  // );
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

  const { data: findedNotes } = useFindNotesQuery(searchedByName);

  // const foundCategory = allCategories?.find(
  //   (category) =>
  //     searchedByCategory &&
  //     category.name.toLowerCase().includes(searchedByCategory),
  // );

  // const viewedNotes =
  //   Array.isArray(orderedNotes) &&
  //   // todo important simplify +
  //   // это можно написать так (note) => а дальше одно большое выражение, которое возвращает true или false
  //   orderedNotes.filter((note) => {
  //     return (
  //       (!searchedByName ||
  //         includesStr(note.content, searchedByName) ||
  //         includesStr(note.title, searchedByName)) &&
  //       (!foundCategory || note.categoryId === foundCategory.id)
  //     );
  //   });

  const viewedNotes = findedNotes?.length ? findedNotes : orderedNotes;

  return {
    viewedNotes,
    searchedByName,
    setSearchedByName,
    // searchedByCategory,
    // setSearchedByCategory,
    isLoadingNotes,
  };
}

export default useNotesStore;

const includesStr = (text: string, find: string) =>
  text.toLowerCase().includes(find);
