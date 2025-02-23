import { Form, Input, Button, FormProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './AddNote.scss';
import SelectCategory from './SelectCategory';
import { useAddNoteMutation, useEditNoteMutation } from './notesListApi';
import { useLoadCategoriesQuery } from '../categoriesList/categoriesListApi';
import { Note } from './notesListSlice';
import { Bounce, toast } from 'react-toastify';

export type FieldType = {
  title: string;
  content: string;
  category: string;
};

//todo important если теперь этот компонент будет использоваться для создания и редактирования, то нужно будет переименовать его как-то по-другому +
function AddOrEditNote({
  note,
  onChangeEditingView,
}: {
  note?: Note;
  onChangeEditingView?: (data: boolean) => void;
}) {
  const navigate = useNavigate();
  const [addNote, { isSuccess }] = useAddNoteMutation();
  const { data: categories } = useLoadCategoriesQuery();
  const { id } = useParams();
  if (!id && note) throw new Error('id is required!');

  const [editNote] = useEditNoteMutation();
  console.log('categories', categories);

  const categoriesOptions = useMemo(
    () =>
      categories?.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    [categories],
  );

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { content, title, category } = values;
    if (note && onChangeEditingView) {
      const newCategory = category || note?.categoryId;

      try {
        if (id) {
          editNote({
            ...note,
            content,
            title,
            id,
            categoryId: newCategory ?? null,
          }).unwrap();
        }
        toast('Note was edited', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
          transition: Bounce,
        });
        console.log('isSuccess-1', isSuccess);
      } catch (e) {
        toast(e, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
          transition: Bounce,
        });
      }

      onChangeEditingView(false);
    } else {
      const newCategory = category || null;
      try {
        await addNote({ content, title, categoryId: newCategory }).then(() =>
          navigate(`/notes`),
        );
        toast('Note created!!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      } catch (e) {
        toast(e, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      }
    }
  };

  console.log('isSuccess-2', isSuccess);

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
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
          rules={[{ required: true, message: 'Please input title!' }]}
          initialValue={note?.title}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={note?.content}
          label="Контент"
          name="content"
          rules={[{ required: true, message: 'Please input content!' }]}
        >
          <TextArea rows={4} minLength={3} showCount />
        </Form.Item>
        <SelectCategory
          categoriesOptions={categoriesOptions || []}
          note={note}
        />
        <Button type="primary" htmlType="submit">
          {note ? 'Сохранить' : 'Добавить заметку'}
        </Button>
      </Form>
    </>
  );
}

export default AddOrEditNote;
