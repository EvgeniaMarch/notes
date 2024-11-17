import React from 'react';
import { Note } from './notesListSlice';
import { Input } from 'antd';

function SearchNote({
  allNotes,
  setNotes,
}: {
  allNotes: Note[];
  setNotes: (data: Note[]) => void;
}) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const find = e.target.value.toLowerCase();
    const filteredNotes = allNotes.filter((note) => {
      return note.title.toLowerCase().includes(find);
    });
    console.log(e.target.value);
    console.log('allNotes', allNotes);

    setNotes(filteredNotes);
  };
  return (
    <div style={{ width: '200px' }}>
      <Input.Search onChange={onChange} placeholder="найти заметку" />
    </div>
  );
}

export default SearchNote;
