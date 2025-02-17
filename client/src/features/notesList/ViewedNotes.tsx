import { Card, Col, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ViewedNotes({ note, categoryToNote }) {
  const navigate = useNavigate();

  return (
    <Col style={{ width: '33%' }} key={note.id}>
      <Card
        title={note.title}
        onClick={() => navigate(`/note/${note.id}`)}
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
