import { Button, Form, FormProps } from 'antd';
import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { FieldType } from './AddNote';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { editNote, Note } from './notesListSlice';
import { useParams } from 'react-router-dom';
import SelectCategory from './SelectCategory';

function EditNote({
  note,
  onChangeEditingView,
}: {
  note: Note | undefined;
  onChangeEditingView: (data: boolean) => void;
}) {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const categories = useAppSelector((state) => state.categories.categoriesList);
  const categoriesOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const { content, title, category } = values;
    const newCategory = category || note?.categoryId;

    if (id) {
      dispatch(
        editNote({
          ...note,
          content,
          title,
          id,
          // Question
          categoryId: newCategory ?? null,
        }),
      );
    }
    onChangeEditingView(false);
  };
  return (
    <>
      {id && (
        <Form onFinish={onFinish}>
          <Form.Item initialValue={note?.title} label="Заголовок" name="title">
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={note?.content}
            label="Контент"
            name="content"
          >
            <TextArea />
          </Form.Item>
          <SelectCategory categoriesOptions={categoriesOptions} note={note} />
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form>
      )}
    </>
  );
}

export default EditNote;
