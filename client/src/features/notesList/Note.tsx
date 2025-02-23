import { EditOutlined, DeleteOutlined, LeftOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './Note.scss';
import { Tooltip } from 'antd';
import { useLoadNoteQuery, useRemoveNoteMutation } from './notesListApi';
import AddOrEditNote from './AddOrEditNote';
// todo поправить ошибки ts
function NotePage() {
  const { id } = useParams();
  if (!id) throw new Error('id is required!');
  const [removeNote] = useRemoveNoteMutation();

  const { data: note } = useLoadNoteQuery(id);

  const navigate = useNavigate();
  const handleDelete = async (id: string) => {
    await removeNote(id).then(() =>
      navigate(
        `/categories/${note?.categoryId ? note.categoryId : 'no-category'}`,
      ),
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
