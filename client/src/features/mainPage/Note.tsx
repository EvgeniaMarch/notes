import { EditOutlined, DeleteOutlined, LeftOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../store/store';
import { editNote, removeNote } from './mainPageSlice';

import './Note.scss';
import { Button, Form, FormProps, Input, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { FieldType } from './AddNote';

// todo поправить ошибки ts
function NotePage() {
  const { id } = useParams();
  const notes = useSelector((state: RootState) => state.notes);
  const note = notes.notesList.find((note) => note.id === id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handlerDelete = (id: string) => {
    dispatch(removeNote(id));
    navigate('/');
  };

  const handlerEdit = () => {
    setIsEdit(true);
  };

  const [isEdit, setIsEdit] = useState(false);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    dispatch(editNote({ ...values, id }));
    setIsEdit(false);
  };

  return (
    <div className="note">
      <div className="note_actions">
        <Tooltip title="К списку заметок" className="note_actions-tips">
          <LeftOutlined onClick={() => navigate('/')} />
        </Tooltip>
        <Tooltip title="Редактировать" className="note_actions-tips">
          <EditOutlined onClick={handlerEdit} />
        </Tooltip>
        <Tooltip title="Удалить" className="note_actions-tips">
          <DeleteOutlined onClick={() => handlerDelete(id)} />
        </Tooltip>
      </div>
      <div className="note_content">
        {!isEdit ? (
          <>
            <h3>{note.title}</h3>
            <div>{note.content}</div>
          </>
        ) : (
          // todo вынести в отдельный компонент
          <Form onFinish={onFinish}>
            <Form.Item initialValue={note.title} label="Заголовок" name="title">
              <Input />
            </Form.Item>
            <Form.Item
              initialValue={note.content}
              label="Контент"
              name="content"
            >
              <TextArea />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
}

export default NotePage;
