import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import MainPage from './features/mainPage/MainPage';
import AddNote from './features/mainPage/AddNote';
import NotePage from './features/mainPage/Note';
import Layout from './Layout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/add-note" element={<AddNote />} />
            <Route path="/note/:id" element={<NotePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
