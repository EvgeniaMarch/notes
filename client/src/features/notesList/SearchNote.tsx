import React, { useEffect, useState } from 'react';
import { Input } from 'antd';

// function SearchNote({
//   searchedByName,
//   setSearchedByName,
// }: {
//   searchedByName: string | null;
//   setSearchedByName: (data: string) => void;
// }) {
//   return (
//     <div style={{ width: '200px' }}>
//       <Input.Search
//         placeholder="найти заметку"
//         {...useDebounce({
//           setDebouncedValue: setSearchedByName,
//           deboucedValue: searchedByName,
//         })}
//       />
//     </div>
//   );
// }

// export default SearchNote;

// const useDebounce = ({ setDebouncedValue, deboucedValue }) => {
//   const [timeOutId, setTimeOutId] = useState<number>();
//   const [value, setValue] = useState<string>(deboucedValue);

//   const handleChange = (e) => {
//     const find = e.target.value.toLowerCase();
//     setValue(find);
//     if (timeOutId) {
//       clearTimeout(timeOutId);
//     }

//     // useEffect(()=>{},[])
//     setTimeOutId(
//       setTimeout(() => {
//         setDebouncedValue(find);
//       }, 1000),
//     );
//   };
//   return { handleChange, value };
// };

function SearchNote({
  searchedByName,
  setSearchedByName,
}: {
  searchedByName: string | null;
  setSearchedByName: (data: string | null) => void;
}) {
  const [search, setSearch] = useState(searchedByName);

  useDebounce({ setDebouncedValue: setSearchedByName, find: search });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const find = e.target.value.toLowerCase();
    setSearch(find);
  };
  return (
    <div style={{ width: '200px' }}>
      <Input.Search
        placeholder="найти заметку"
        onChange={handleChange}
        value={search || ''}
      />
    </div>
  );
}

export default SearchNote;

const useDebounce = ({
  setDebouncedValue,
  find,
}: {
  setDebouncedValue: (data: string | null) => void;
  find: string | null;
}) => {
  const [timeOutId, setTimeOutId] = useState<number>();
  useEffect(() => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }

    setTimeOutId(
      setTimeout(() => {
        setDebouncedValue(find);
      }, 1000),
    );
  }, [setDebouncedValue, find]);
};
// таймер -> напоминает тебе о чём-то
// событие ввода

// 1. ввод
// 2. засекаем таймер на сек
// 3.1. ввод -> останавливаем таймер -> засекамем таймер ещё раз
// 4. когда таймер закончился, отправляем запрос
