import React from 'react';
import { Input } from 'antd';

function SearchNote({
  searchedByName,
  setSearchedByName,
}: {
  searchedByName: string | null;
  setSearchedByName: (data: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const find = e.target.value.toLowerCase();
    setSearchedByName(find);
  };

  return (
    <>
      <div style={{ width: '200px' }}>
        <Input.Search
          onChange={handleChange}
          placeholder="найти заметку"
          value={searchedByName || ''}
        />
      </div>
    </>
  );
}

export default SearchNote;
