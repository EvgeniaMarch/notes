import { Form, Select } from 'antd';
import React from 'react';

function SelectCategory({
  categoriesOptions,
}: {
  categoriesOptions: { value: string; label: string }[];
}) {
  return (
    <Form.Item label="Категория" name="category">
      <Select options={categoriesOptions} />
    </Form.Item>
  );
}

export default SelectCategory;
