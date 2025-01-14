import { Form, Input, Button, FormProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useMemo } from 'react';
// import { addNote } from './notesListSlice';
import { useNavigate } from 'react-router-dom';

import './AddNote.scss';
// import { loadCategories } from '../categoriesList/categoriesListSlice';
import SelectCategory from './SelectCategory';
import { useAddNoteMutation, useLoadNotesQuery } from './notesListApi';
import { useLoadCategoriesQuery } from '../categoriesList/categoriesListApi';

export type FieldType = {
  title: string;
  content: string;
  category: string;
};

//todo join AddNote & EditNote
function AddNote() {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { refetch } = useLoadNotesQuery();
  const [addNote] = useAddNoteMutation();
  const { data: categories } = useLoadCategoriesQuery();
  console.log('categories', categories);

  // const categories = useAppSelector((state) => state.categories.categoriesList);

  // todo useMemo +
  const categoriesOptions = useMemo(
    () =>
      categories?.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    [categories],
  );

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('values', values);
    const { content, title, category } = values;
    const newCategory = category || null;
    console.log('note', { content, title, categoryId: newCategory });
    // dispatch(addNote({ content, title, categoryId: newCategory }));
    await addNote({ content, title, categoryId: newCategory }).then(() =>
      navigate(`/notes`),
    );

    refetch();
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };
  return (
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
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Контент"
        name="content"
        // todo мин 20 символов
        rules={[{ required: true, message: 'Please input content!' }]}
      >
        <TextArea rows={4} minLength={3} showCount />
      </Form.Item>
      <SelectCategory categoriesOptions={categoriesOptions || []} />
      <Button type="primary" htmlType="submit">
        Добавить заметку
      </Button>
    </Form>
  );
}

export default AddNote;
