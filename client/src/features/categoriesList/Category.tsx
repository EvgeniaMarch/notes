import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { loadNotes, Note } from '../notesList/notesListSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Row, Typography } from 'antd';

function Category() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [notes, setNotes] = useState<Note[]>([]);
  const allNotes = useAppSelector((state) => state.notes.notesList);
  console.log('allNotes', allNotes);

  useEffect(() => {
    if (id === 'no-category') {
      const notesWithoutCat = allNotes.filter(
        (note) => note.categoryId === null,
      );
      setNotes(notesWithoutCat);
    } else {
      const notesFromCat = allNotes.filter((note) => note.categoryId === id);
      setNotes(notesFromCat);
    }
  }, [allNotes, id]);

  const { Paragraph } = Typography;

  useEffect(() => {
    dispatch(loadNotes());
  }, [dispatch, id]);

  console.log('notes', notes);

  return (
    <div className="category-page">
      {/* Question */}
      {/* <SearchNote allNotes={notes} setNotes={setNotes} /> */}
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

export default Category;
