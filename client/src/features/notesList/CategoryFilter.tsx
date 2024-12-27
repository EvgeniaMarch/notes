import React from 'react';
import { Input } from 'antd';

function CategoryFilter({
  searchedByCategory,
  setSearchedByCategory,
}: {
  searchedByCategory: string | null;
  setSearchedByCategory: (data: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const find = e.target.value.toLowerCase();
    setSearchedByCategory(find);
  };
  return (
    <div style={{ width: '200px' }}>
      <Input.Search
        onChange={handleChange}
        placeholder="фильтрация по категории"
        value={searchedByCategory || ''}
      />
    </div>
  );
}

export default CategoryFilter;
