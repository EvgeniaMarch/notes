import { Form, Select } from 'antd';
import React, { useCallback } from 'react';
import { Note } from './notesListSlice';

// todo create additional folders inside notesList
function SelectCategory({
  categoriesOptions,
  note,
}: {
  categoriesOptions: { value: string; label: string }[];
  note?: Note;
}) {
  // todo use useMemo+
  const getInitialValue = useCallback(
    (id: string | null | undefined) => {
      for (const option of categoriesOptions) {
        if (option.value === id) {
          return option.value;
        }
      }
    },
    [categoriesOptions],
  );
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
