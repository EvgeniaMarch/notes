import { Form, Select } from 'antd';
import React from 'react';
import { Note } from './notesListSlice';

function SelectCategory({
  categoriesOptions,
  note,
}: {
  categoriesOptions: { value: string; label: string }[];
  note?: Note;
}) {
  const getInitialValue = (id: string | null | undefined) => {
    for (const option of categoriesOptions) {
      if (option.value === id) {
        return option.value;
      }
    }
  };
  return (
    <Form.Item
      label="Категория"
      name="category"
      initialValue={getInitialValue(note?.categoryId)}
    >
      <Select options={categoriesOptions} />
    </Form.Item>
  );
}

export default SelectCategory;
