import { Button, Card, Row, Col, Typography, Skeleton } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import './NotesList.scss';
import { useAppSelector } from '../../store/store';
import { useEffect, useMemo, useState } from 'react';
import { Note } from './notesListSlice';
import SearchNote from './SearchNote';
import CategoryFilter from './CategoryFilter';
import {
  useLazyLoadNotesFromCategoryQuery,
  useLoadNotesQuery,
} from './notesListApi';
import useGetViewedNotes from '../../hooks/getViewedNotes';
import { useLoadCategoriesQuery } from '../categoriesList/categoriesListApi';

// next useMemo, useCallback, memo
// todo отображать категорию для каждой заметки +
// todo правильно сортировать заметки (последняя отредактированная в начале) +
// todo новая заметка тоже в начале +
// todo загружать с сервера только необходимые заметки +
// todo move logic to custom hook+
function NotesList() {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // const allNotes = useAppSelector((state: RootState) => state.notes.notesList);
  // const allCategories = useAppSelector(
  //   (state: RootState) => state.categories.categoriesList,
  // );
  const { data: allCategories } = useLoadCategoriesQuery();
  const { data: allNotes } = useLoadNotesQuery();
  const [loadNotesFromCategory] = useLazyLoadNotesFromCategoryQuery();

  const loading = useAppSelector((state) => state.notes.loading);
  const error = useAppSelector((state) => state.notes.error);
  const [searchedByName, setSearchedByName] = useState<string | null>(null);
  const [searchedByCategory, setSearchedByCategory] = useState<string | null>(
    null,
  );

  const { Paragraph } = Typography;
  const { id } = useParams();

  const categoryToNote = (id: string | null) => {
    const category = allCategories?.find((category) => category.id === id);
    return category?.name || 'Без категории';
  };

  // todo move to useMemo+
  // useEffect(() => {
  //   const ordredNotes =
  //     allNotes &&
  //     allNotes.length &&
  //     [...allNotes].sort((a, b) => {
  //       return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
  //     });
  //   if (ordredNotes && ordredNotes.length) {
  //     setNotes(ordredNotes);
  //   }
  // }, [allNotes, id, searchedByName]);

  const orderedNotes = useMemo(
    () =>
      allNotes &&
      allNotes.length &&
      [...allNotes].sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
      }),
    [allNotes],
  );

  const viewedNotes = useGetViewedNotes({
    orderedNotes,
    searchedByCategory,
    searchedByName,
  });

  // todo подумать над упрощением и заставить работать
  useEffect(() => {
    // if (!id) {
    //   dispatch(loadNotes());
    // } else {
    //   dispatch(loadNotesFromCategory(id));
    // }
    if (id) {
      const data = loadNotesFromCategory(id);
      console.log(data);
    }
  }, [id, loadNotesFromCategory]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <SearchNote
        searchedByName={searchedByName}
        setSearchedByName={setSearchedByName}
      />
      <CategoryFilter
        searchedByCategory={searchedByCategory}
        setSearchedByCategory={setSearchedByCategory}
      />
      {error ? (
        <div>{error}</div>
      ) : loading ? (
        <Skeleton />
      ) : (
        <div className="card-wrapper">
          <Row style={{ width: '100%' }}>
            {Array.isArray(viewedNotes) &&
              viewedNotes?.map((note: Note) => {
                return (
                  <Col style={{ width: '33%' }} key={note.id}>
                    <Card
                      title={note.title}
                      onClick={() => navigate(`/notes/note/${note.id}`)}
                      className="card-wrapper__card"
                      hoverable
                    >
                      <Paragraph
                        ellipsis={{
                          rows: 2,
                        }}
                      >
                        {note.content}
                      </Paragraph>
                      <Typography.Text>
                        Категория: {categoryToNote(note.categoryId)}
                      </Typography.Text>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </div>
      )}
      <Button onClick={() => navigate('/notes/add-note')}>
        Добавить заметку
      </Button>
    </div>
  );
}

export default NotesList;
