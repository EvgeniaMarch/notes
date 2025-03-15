import React from 'react';
import { Card, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Note } from './notesListSlice';

function ViewedNotes({
  note,
  categoryToNote,
}: {
  note: Note;
  categoryToNote: (id: string | null) => string;
}) {
  const navigate = useNavigate();

  return (
    <Col style={{ width: '33%' }} key={note.id}>
      <Card
        title={note.title}
        onClick={() => navigate(`/notes/${note.id}`)}
        className="card-wrapper__card"
        hoverable
      >
        <Typography.Paragraph
          ellipsis={{
            rows: 2,
          }}
        >
          {note.content}
        </Typography.Paragraph>
        <Typography.Text>
          Категория: {categoryToNote(note.categoryId)}
        </Typography.Text>
      </Card>
    </Col>
  );
}

export default ViewedNotes;
