import { EditOutlined, DeleteOutlined, LeftOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useAppDispatch } from '../../store/store';
// import { removeNote } from './notesListSlice';

import "./Note.scss";
import { Tooltip } from "antd";
import EditNote from "./EditNote";
import {
  useLoadNoteQuery,
  useLoadNotesQuery,
  useRemoveNoteMutation,
} from "./notesListApi";
import AddNote from "./AddNote";
import { Bounce, ToastContainer } from "react-toastify";
import { Note } from "./notesListSlice";

// todo поправить ошибки ts
function NotePage() {
  const { id } = useParams();
  if (!id) throw new Error("id is required!");
  // const { data } = useLoadNoteQuery(id);
  // const notes = useSelector((state: RootState) => state.notes);
  // const { data: notes, refetch } = useLoadNotesQuery();
  const [removeNote] = useRemoveNoteMutation();
  const { data: note } = useLoadNoteQuery(id);
  // const { refetch } = useLoadNotesQuery();

  // const note = notes?.find((note) => note.id === id);
  const navigate = useNavigate();
  const handleDelete = async (note: Note) => {
    await removeNote(note).then(() => navigate(`/category/${note.categoryId}`));

    // refetch();
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
            <DeleteOutlined onClick={() => handleDelete(note)} />
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
          <AddNote note={note} onChangeEditingView={setIsEdit} />
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default NotePage;
