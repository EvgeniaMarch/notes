import { Button, Card, Row, Col, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './MainPage.scss';
import { Note } from './mainPageSlice';

function MainPage() {
  const navigate = useNavigate();
  const notes = useSelector((state) => state.notes);
  const { Paragraph } = Typography;

  return (
    <>
      <div className="card-wrapper">
        <Row gutter={16}>
          {notes.notes.map((note: Note) => {
            return (
              <Col span={8} key={note.id}>
                <Card
                  title={note.title}
                  onClick={() => navigate(`note/${note.id}`)}
                  className="card-wrapper_card"
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
      <Button onClick={() => navigate('/add-note')}>Добавить заметку</Button>
    </>
  );
}

export default MainPage;
