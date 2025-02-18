import { Form, Select } from "antd";
import React, { useMemo } from "react";
import { Note } from "./notesListSlice";

// todo create additional folders inside notesList
function SelectCategory({
  categoriesOptions,
  note,
}: {
  categoriesOptions: { value: string; label: string }[];
  note?: Note;
}) {
  const getInitialValue = useMemo(() => {
    for (const option of categoriesOptions) {
      if (note && option.value === note.id) {
        return option.value;
      }
    }
  }, [categoriesOptions, note]);
  return (
    <Form.Item label="Категория" name="category" initialValue={getInitialValue}>
      <Select options={categoriesOptions} />
    </Form.Item>
  );
}

export default SelectCategory;
