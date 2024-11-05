import { Button, Card, Row, Col, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './MainPage.scss';
import { Note } from './mainPageSlice';
import { RootState } from '../../store/store';

// next useMemo, useCallback, memo
function MainPage() {
  const navigate = useNavigate();
  // next типизировать useSelector (useAppSelector)
  const notes = useSelector((state: RootState) => state.notes);
  const { Paragraph } = Typography;

  return (
    <>
      <div className="card-wrapper">
        <Row gutter={16}>
          {notes.notesList.map((note: Note) => {
            return (
              <Col span={8} key={note.id}>
                <Card
                  title={note.title}
                  onClick={() => navigate(`note/${note.id}`)}
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
      <Button onClick={() => navigate('/add-note')}>Добавить заметку</Button>
    </>
  );
}

export default MainPage;
