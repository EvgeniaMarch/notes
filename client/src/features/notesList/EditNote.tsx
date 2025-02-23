import { Button, Form, FormProps } from 'antd';
import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';
import React, { useMemo } from 'react';
import { FieldType } from './AddOrEditNote';
import { Note } from './notesListSlice';
import { useParams } from 'react-router-dom';
import SelectCategory from './SelectCategory';
import {
  useEditNoteMutation,
  useLoadNoteQuery,
  useLoadNotesQuery,
} from './notesListApi';
import { useLoadCategoriesQuery } from '../categoriesList/categoriesListApi';

function EditNote({
  note,
  onChangeEditingView,
}: {
  note: Note | undefined;
  onChangeEditingView: (data: boolean) => void;
}) {
  // const { id } = useParams();
  // if (!id) throw new Error('id is required!');

  // const { data: categories } = useLoadCategoriesQuery();
  // const [editNote] = useEditNoteMutation();

  // const categoriesOptions = useMemo(
  //   () =>
  //     categories?.map((category) => ({
  //       value: category.id,
  //       label: category.name,
  //     })),
  //   [categories],
  // );

  // const { refetch: refetchAllNotes } = useLoadNotesQuery();
  // const { refetch } = useLoadNoteQuery(id);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const { content, title, category } = values;
    const newCategory = category || note?.categoryId;

  //   editNote({
  //     ...note,
  //     content,
  //     title,
  //     id,
  //     categoryId: newCategory ?? null,
  //   }).unwrap();
  //   refetch();
  //   refetchAllNotes();

  //   onChangeEditingView(false);
  // };
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
          <SelectCategory
            categoriesOptions={categoriesOptions || []}
            note={note}
          />
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form>
      )}
    </>
  );
}

export default EditNote;
