import { Input, Button, FormProps, Form } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useAddCategoryMutation } from './categoriesListApi';
import { Bounce, toast } from 'react-toastify';

export type FieldType = {
  name: string;
};

function AddCategory() {
  const navigate = useNavigate();
  const [addCategory, { isError, isSuccess }] = useAddCategoryMutation(); // todo important показать успешный тост или тост с ошибкой +
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await addCategory(values);
      toast('New category was added', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
        transition: Bounce,
      });
    } catch (e) {
      console.error(e);
      toast(e.error, {
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
    navigate(`/`);
  };
  console.log('isError', isError, isSuccess);

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
        rules={[{ required: true, message: 'Please input name!' }]}
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
