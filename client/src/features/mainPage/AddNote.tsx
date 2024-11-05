import { Form, Input, Button, FormProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { addNote } from './mainPageSlice';
import { useAppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';

import './AddNote.scss';

export type FieldType = {
  title: string;
  content: string;
};

function AddNote() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    dispatch(addNote(values));
    navigate(`/`);
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
      <Button type="primary" htmlType="submit">
        Добавить заметку
      </Button>
    </Form>
  );
}

export default AddNote;
