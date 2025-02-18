import { Form, Input, Button, FormProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useMemo } from "react";
// import { addNote } from './notesListSlice';
import { useNavigate, useParams } from "react-router-dom";

import "./AddNote.scss";
// import { loadCategories } from '../categoriesList/categoriesListSlice';
import SelectCategory from "./SelectCategory";
import {
  useAddNoteMutation,
  useEditNoteMutation,
  useLoadNoteQuery,
  useLoadNotesQuery,
} from "./notesListApi";
import { useLoadCategoriesQuery } from "../categoriesList/categoriesListApi";
import { Note } from "./notesListSlice";
import { Bounce, toast, ToastContainer } from "react-toastify";

export type FieldType = {
  title: string;
  content: string;
  category: string;
};

//todo important если теперь этот компонент будет использоваться для создания и редактирования, то нужно будет переименовать его как-то по-другому
function AddNote({
  note,
  onChangeEditingView,
}: {
  note?: Note;
  onChangeEditingView?: (data: boolean) => void;
}) {
  const navigate = useNavigate();
  const [addNote] = useAddNoteMutation();
  const { data: categories } = useLoadCategoriesQuery();
  const { id } = useParams();
  if (!id && note) throw new Error("id is required!");
  // const { refetch: refetchAllNotes } = useLoadNotesQuery();
  // const { refetch } = useLoadNoteQuery(id);

  const [editNote] = useEditNoteMutation();
  console.log("categories", categories);

  const categoriesOptions = useMemo(
    () =>
      categories?.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    [categories]
  );

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { content, title, category } = values;
    if (note && onChangeEditingView) {
      const newCategory = category || note?.categoryId;

      editNote({
        ...note,
        content,
        title,
        id,
        categoryId: newCategory ?? null,
      }).unwrap();
      // .then(() => navigate(`/notes`));
      // refetch();
      toast("Note changed!!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        // progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      onChangeEditingView(false);
    } else {
      const newCategory = category || null;
      await addNote({ content, title, categoryId: newCategory }).then(() =>
        navigate(`/notes`)
      );
      toast("Note created!!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    // refetchAllNotes();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="add-form"
      >
        <Form.Item
          label="Заголовок"
          name="title"
          rules={[{ required: true, message: "Please input title!" }]}
          initialValue={note?.title}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={note?.content}
          label="Контент"
          name="content"
          // todo мин 20 символов
          rules={[{ required: true, message: "Please input content!" }]}
        >
          <TextArea rows={4} minLength={3} showCount />
        </Form.Item>
        <SelectCategory
          categoriesOptions={categoriesOptions || []}
          note={note}
        />
        <Button type="primary" htmlType="submit">
          {note ? "Сохранить" : "Добавить заметку"}
        </Button>
      </Form>
    </>
  );
}

export default AddNote;
