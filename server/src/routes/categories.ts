import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Получить все категории
router.get("/", async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении категорий" });
  }
});

// Получить категорию по ID
router.get("/:id", async (req, res) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: req.params.id },
    });
    if (!category) {
      return res.status(404).json({ error: "Категория не найдена" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении категории" });
  }
});

// Создать категорию
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({
      data: { name },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при создании категории" });
  }
});

// Обновить категорию
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.update({
      where: { id: req.params.id },
      data: { name },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обновлении категории" });
  }
});

// Удалить категорию
router.delete("/:id", async (req, res) => {
  try {
    await prisma.category.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Ошибка при удалении категории" });
  }
});

// Получить все заметки по ID категории
router.get("/:id/notes", async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: {
        categoryId: req.params.id,
      },
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении заметок категории" });
  }
});

export default router;
