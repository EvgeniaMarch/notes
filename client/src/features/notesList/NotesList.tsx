import { Button, Card, Row, Col, Typography, Skeleton } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import './NotesList.scss';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { loadNotes, loadNotesFromCategory, Note } from './notesListSlice';
import SearchNote from './SearchNote';
import CategoryFilter from './CategoryFilter';
import {
  notesListApi,
  useLoadNotesQuery,
  useloadNotesQuery,
} from './notesListApi';

// next useMemo, useCallback, memo
// todo отображать категорию для каждой заметки +
// todo правильно сортировать заметки (последняя отредактированная в начале) +
// todo новая заметка тоже в начале +
// todo загружать с сервера только необходимые заметки +
function NotesList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const allNotes = useAppSelector((state: RootState) => state.notes.notesList);
  const allCategories = useAppSelector(
    (state: RootState) => state.categories.categoriesList,
  );
  const { data } = useLoadNotesQuery();

  const loading = useAppSelector((state) => state.notes.loading);
  const error = useAppSelector((state) => state.notes.error);
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchedByName, setSearchedByName] = useState<string | null>(null);
  const [searchedByCategory, setSearchedByCategory] = useState<string | null>(
    null,
  );

  const { Paragraph } = Typography;
  const { id } = useParams();

  const categoryToNote = (id: string | null) => {
    const category = allCategories.find((category) => category.id === id);
    return category?.name || 'Без категории';
  };

  useEffect(() => {
    const ordredNotes = [...allNotes].sort((a, b) => {
      return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    });
    setNotes(ordredNotes);
  }, [allNotes, id, searchedByName]);

  const viewedNotes = useMemo(() => {
    const foundCategory = allCategories.find(
      (category) =>
        searchedByCategory &&
        category.name.toLowerCase().includes(searchedByCategory),
    );
    console.log('foundCategory', foundCategory);

    return notes.filter((note) => {
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
  }, [allCategories, notes, searchedByCategory, searchedByName]);

  useEffect(() => {
    if (!id) {
      dispatch(loadNotes());
    } else {
      dispatch(loadNotesFromCategory(id));
    }
  }, [dispatch, id]);

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
            {viewedNotes?.map((note: Note) => {
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
