import { Form, Input, Button, FormProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { addNote } from './mainPageSlice';
import { useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';

type FieldType = {
  title: string;
  content: string;
};

function MainPage() {
  const dispatch = useAppDispatch();

  const notes = useSelector((state) => state);
  console.log('notes', notes);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('values', values);

    dispatch(addNote(values));
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

export default MainPage;
