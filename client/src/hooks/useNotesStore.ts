import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { findNotes, loadNotes } from '../features/notesList/notesListSlice';

function useNotesStore() {
  const { id } = useParams();
  const [searchedByName, setSearchedByName] = useState<string | null>(null);

  const allNotes = useAppSelector((state) => state.notes.notesList);
  const isLoadingNotes = useAppSelector((state) => state.notes.loading);
  const isError = useAppSelector((state) => state.notes.error);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadNotes(id));
  }, [dispatch, id]);
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

  useEffect(() => {
    if (searchedByName) {
      dispatch(findNotes(searchedByName));
    }
  }, [dispatch, searchedByName]);
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

  // const viewedNotes = findedNotes?.length ? findedNotes : orderedNotes;
  const viewedNotes = orderedNotes;

  return {
    viewedNotes,
    searchedByName,
    setSearchedByName,
    isError,
    // searchedByCategory,
    // setSearchedByCategory,
    isLoadingNotes,
  };
}

export default useNotesStore;

// const includesStr = (text: string, find: string) =>
//   text.toLowerCase().includes(find);
