import { Button, Row, Skeleton } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import './NotesList.scss';
import { useAppSelector } from '../../store/store';
import { useMemo, useState } from 'react';
import { Note } from './notesListSlice';
import SearchNote from './SearchNote';
import CategoryFilter from './CategoryFilter';
import { useLoadNotesQuery } from './notesListApi';
import { useLoadCategoriesQuery } from '../categoriesList/categoriesListApi';
import ViewedNotes from './ViewedNotes';
import useNotesStore from '../../hooks/useNotesStore';
import { Bounce, toast, ToastContainer } from 'react-toastify';

function NotesList() {
  const navigate = useNavigate();

  const {
    data: allCategories,
    isError,
    error,
    isLoading: loading,
  } = useLoadCategoriesQuery();

  const { id } = useParams();
  // todo important переместить внутрь useNotesStore
  const { data: allNotes } = useLoadNotesQuery(id);

  // todo important нужно ли здесь useMemo/useCallback и почему?
  const categoryToNote = (id: string | null) => {
    const category = allCategories?.find((category) => category.id === id);
    return category?.name || 'Без категории';
  };

  // useNotesStore
  const {
    viewedNotes,
    searchedByName,
    setSearchedByName,
    searchedByCategory,
    setSearchedByCategory,
  } = useNotesStore({
    allNotes,
  });

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
                  <ViewedNotes note={note} categoryToNote={categoryToNote} />
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
          navigate('/new-note');
        }}
      >
        Добавить заметку
      </Button>
      {/* <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      /> */}
    </div>
  );
}

export default NotesList;
