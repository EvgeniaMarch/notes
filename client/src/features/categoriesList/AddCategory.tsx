import { Input, Select, Button, FormProps, Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { addCategory } from './categoriesListSlice';

export type FieldType = {
  name: string;
};

function AddCategory() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    dispatch(addCategory(values));
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
        label="Название"
        name="name"
        rules={[{ required: true, message: 'Please input тфьу!' }]}
      >
        <Input />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Добавить категорию
      </Button>
    </Form>
  );
}

export default AddCategory;
