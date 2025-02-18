import { Input, Button, FormProps, Form } from "antd";
import { useNavigate } from "react-router-dom";
import // useAddCategoryMutation,
// useLoadCategoriesQuery,
"../notesList/notesListApi";
import {
  useAddCategoryMutation,
  useLoadCategoriesQuery,
} from "./categoriesListApi";

export type FieldType = {
  name: string;
};

function AddCategory() {
  const navigate = useNavigate();
  // const { refetch } = useLoadCategoriesQuery();
  const [addCategory] = useAddCategoryMutation(); // todo important показать успешный тост или тост с ошибкой
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    await addCategory(values);
    navigate(`/`);
    // refetch();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
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
        rules={[{ required: true, message: "Please input name!" }]}
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
