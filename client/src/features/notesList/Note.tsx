import { EditOutlined, DeleteOutlined, LeftOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { useAppDispatch } from '../../store/store';
// import { removeNote } from './notesListSlice';

import './Note.scss';
import { Tooltip } from 'antd';
import EditNote from './EditNote';
import { useLoadNotesQuery, useRemoveNoteMutation } from './notesListApi';

// todo поправить ошибки ts +
function NotePage() {
  const { id } = useParams();
  // const notes = useSelector((state: RootState) => state.notes);
  const { data: notes, refetch } = useLoadNotesQuery();
  const [removeNote] = useRemoveNoteMutation();

  const note = notes?.find((note) => note.id === id);
  const navigate = useNavigate();
  const handleDelete = async (id: string) => {
    await removeNote(id).then(() => navigate('/notes'));

    refetch();
  };

  const handleEdit = () => {
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
          // todo вынести в отдельный компонент +
          <EditNote note={note} onChangeEditingView={setIsEdit} />
        )}
      </div>
    </div>
  );
}

export default NotePage;
