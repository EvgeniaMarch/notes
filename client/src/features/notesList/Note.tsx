import { EditOutlined, DeleteOutlined, LeftOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../store/store';
import { removeNote } from './notesListSlice';

import './Note.scss';
import { Tooltip } from 'antd';
import EditNote from './EditNote';

// todo поправить ошибки ts +
function NotePage() {
  const { id } = useParams();
  const notes = useSelector((state: RootState) => state.notes);
  const note = notes.notesList.find((note) => note.id === id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleDelete = (id: string) => {
    dispatch(removeNote(id));
    navigate('/notes');
  };

  const handlerEdit = () => {
    setIsEdit(true);
  };

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="note">
      <div className="note_actions">
        <Tooltip title="К списку заметок" className="note_actions-tips">
          <LeftOutlined onClick={() => navigate('/notes')} />
        </Tooltip>
        <Tooltip title="Редактировать" className="note_actions-tips">
          <EditOutlined onClick={handlerEdit} />
        </Tooltip>
        {id && (
          <Tooltip title="Удалить" className="note_actions-tips">
            <DeleteOutlined onClick={() => handleDelete(id)} />
          </Tooltip>
        )}
      </div>
      <div className="note_content">
        {!isEdit ? (
          <>
            <h3>{note?.title}</h3>
            <div>{note?.content}</div>
          </>
        ) : (
          // todo вынести в отдельный компонент +
          <EditNote note={note} setIsEdit={setIsEdit} />
        )}
      </div>
    </div>
  );
}

export default NotePage;
