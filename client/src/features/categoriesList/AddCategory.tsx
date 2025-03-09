import { Input, Button, FormProps, Form } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useAddCategoryMutation } from './categoriesListApi';
import { isFetchError } from '../../helpers/errors';
import { showToast } from '../../helpers/showToast';

export type FieldType = {
  name: string;
};

function AddCategory() {
  const navigate = useNavigate();
  const [addCategory] = useAddCategoryMutation(); // todo important показать успешный тост или тост с ошибкой +

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await addCategory(values).unwrap();
      // todo упростить, написать функцию-обертку, куда преедаю сообщение, а она вызввает toast+

      showToast('New category was added');
    } catch (e) {
      console.error(e);
      if (isFetchError(e)) {
        showToast(e.data.error);
      }
    }
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
