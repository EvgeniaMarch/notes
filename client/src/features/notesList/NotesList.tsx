import { Button, Row, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import './NotesList.scss';
import { Note } from './notesListSlice';
import SearchNote from './SearchNote';
import CategoryFilter from './CategoryFilter';
import { useLoadCategoriesQuery } from '../categoriesList/categoriesListApi';
import ViewedNotes from './ViewedNotes';
import useNotesStore from '../../hooks/useNotesStore';
import { useCallback } from 'react';

function NotesList() {
  const navigate = useNavigate();

  const {
    data: allCategories,
    isError,
    error,
    isLoading: loading,
  } = useLoadCategoriesQuery();

  // todo important нужно ли здесь useMemo/useCallback и почему?
  // нужен потому что мы передаем эту функцию в качестве пропса в другой компонент
  const categoryToNote = useCallback(
    (id: string | null) => {
      const category = allCategories?.find((category) => category.id === id);
      return category?.name || 'Без категории';
    },
    [allCategories],
  );

  const {
    viewedNotes,
    searchedByName,
    setSearchedByName,
    searchedByCategory,
    setSearchedByCategory,
  } = useNotesStore();

  return (
    <div className="container">
      <SearchNote
        searchedByName={searchedByName}
        setSearchedByName={setSearchedByName}
      />
      <CategoryFilter
        searchedByCategory={searchedByCategory}
        setSearchedByCategory={setSearchedByCategory}
      />
      {isError ? (
        <div>{error}</div>
      ) : loading ? (
        <Skeleton />
      ) : (
        <div className="card-wrapper">
          <Row style={{ width: '100%' }}>
            {Array.isArray(viewedNotes) && viewedNotes.length ? (
              viewedNotes?.map((note: Note) => {
                return (
                  <ViewedNotes
                    key={note.id}
                    note={note}
                    categoryToNote={categoryToNote}
                  />
                );
              })
            ) : (
              <div>В данной категори нет заметок</div>
            )}
          </Row>
        </div>
      )}
      <Button
        onClick={() => {
          navigate('/notes/new');
        }}
      >
        Добавить заметку
      </Button>
    </div>
  );
}

export default NotesList;
