import { Form, Input, Button, FormProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect } from 'react';
import { addNote } from './notesListSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useNavigate } from 'react-router-dom';

import './AddNote.scss';
import { loadCategories } from '../categoriesList/categoriesListSlice';
import SelectCategory from './SelectCategory';

export type FieldType = {
  title: string;
  content: string;
  category: string;
};

function AddNote() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector((state) => state.categories.categoriesList);
  const categoriesOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);
  // console.log('categories', categories);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('values', values);
    const { content, title, category } = values;
    const newCategory = category || null;
    console.log('note', { content, title, categoryId: newCategory });
    // Question
    dispatch(addNote({ content, title, categoryId: newCategory }));
    navigate(`/notes`);
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
        <TextArea rows={4} />
      </Form.Item>
      <SelectCategory categoriesOptions={categoriesOptions} />
      {/* <Form.Item label="Категория" name="category">
        <Select options={categoriesOptions} />
      </Form.Item> */}
      <Button type="primary" htmlType="submit">
        Добавить заметку
      </Button>
    </Form>
  );
}

export default AddNote;
