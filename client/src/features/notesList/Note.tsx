import { EditOutlined, DeleteOutlined, LeftOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './Note.scss';
import { Tooltip } from 'antd';
import AddOrEditNote from './AddOrEditNote';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { removeNote } from './notesListSlice';
// todo поправить ошибки ts
function NotePage() {
  const { id } = useParams();
  if (!id) throw new Error('id is required!');
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes.notesList);
  const note = notes.find((note) => note.id === id);

  const navigate = useNavigate();
  const handleDelete = async (id: string) => {
    // await removeNote(id).then(() =>
    //   navigate(`/categories/${note?.categoryId ? note.categoryId : 'none'}`),
    // );
    dispatch(removeNote(id)).then(() =>
      navigate(`/categories/${note?.categoryId ? note.categoryId : 'none'}`),
    );
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="note">
      <div className="note_actions">
        <Tooltip title="К списку заметок" className="note_actions-tips">
          <LeftOutlined onClick={() => navigate(-1)} />
        </Tooltip>
        <Tooltip title="Редактировать" className="note_actions-tips">
          <EditOutlined onClick={handleEdit} />
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
          <AddOrEditNote note={note} onChangeEditingView={setIsEdit} />
        )}
      </div>
    </div>
  );
}

export default NotePage;
