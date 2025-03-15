import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NotesList from './features/notesList/NotesList';
import AddOrEditNote from './features/notesList/AddOrEditNote';
import NotePage from './features/notesList/Note';
import Layout from './Layout';
import CategoriesList from './features/categoriesList/CategoriesList';
import AddCategory from './features/categoriesList/AddCategory';
import { Bounce, ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<CategoriesList />} />
            <Route path="/categories/new" element={<AddCategory />} />
            <Route path="/categories/:id" element={<NotesList />} />
            <Route path="/notes" element={<NotesList />} />
            <Route path="/notes/new" element={<AddOrEditNote />} />
            <Route path="/notes/:id" element={<NotePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
