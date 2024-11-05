import express from "express";
import cors from "cors";
import notesRouter from "./routes/notes";
import categoriesRouter from "./routes/categories";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/notes", notesRouter);
app.use("/api/categories", categoriesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
