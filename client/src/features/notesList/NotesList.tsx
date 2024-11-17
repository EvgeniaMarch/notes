import { Button, Card, Row, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import './NotesList.scss';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect, useState } from 'react';
import { loadNotes, Note } from './notesListSlice';
import SearchNote from './SearchNote';
import { loadCategories } from '../categoriesList/categoriesListSlice';

// next useMemo, useCallback, memo
// todo отображать категорию для каждой заметки +
// todo правильно сортировать заметки (последняя отредактированная в начале) +
// todo новая заметка тоже в начале +
function NotesList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const allNotes = useAppSelector((state: RootState) => state.notes.notesList);
  const allCategories = useAppSelector(
    (state: RootState) => state.categories.categoriesList,
  );
  const [notes, setNotes] = useState<Note[]>([]);

  const { Paragraph } = Typography;

  const categoryToNote = (id: string | null) => {
    const category = allCategories.find((category) => category.id === id);
    return category?.name || 'Без категории';
  };
  // console.log('allNotes', allNotes);

  useEffect(() => {
    const ordredNotes = [...allNotes]?.sort((a, b) => {
      return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    });
    setNotes(ordredNotes);
  }, [allNotes]);

  useEffect(() => {
    dispatch(loadNotes());
    dispatch(loadCategories());
  }, [dispatch]);
  // console.log(notes);

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
      <SearchNote allNotes={allNotes} setNotes={setNotes} />
      <div className="card-wrapper">
        <Row style={{ width: '100%' }}>
          {notes.map((note: Note) => {
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
      <Button onClick={() => navigate('/notes/add-note')}>
        Добавить заметку
      </Button>
    </div>
  );
}

export default NotesList;
