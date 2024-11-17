import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NotesList from './features/notesList/NotesList';
import AddNote from './features/notesList/AddNote';
import NotePage from './features/notesList/Note';
import Layout from './Layout';
import CategoriesList from './features/categoriesList/CategoriesList';
import AddCategory from './features/categoriesList/AddCategory';
import Category from './features/categoriesList/Category';

function App() {
  // next сделать пути по ресту
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<CategoriesList />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/notes" element={<NotesList />} />
          <Route path="/notes/add-note" element={<AddNote />} />
          <Route path="/notes/note/:id" element={<NotePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
