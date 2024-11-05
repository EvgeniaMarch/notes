import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import MainPage from "./features/mainPage/MainPage";
import AddNote from "./features/mainPage/AddNote";
import NotePage from "./features/mainPage/Note";
import Layout from "./Layout";
import { useEffect } from "react";

function App() {
  // пример запроса к серверу
  useEffect(() => {
    fetch("/api/notes")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

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
