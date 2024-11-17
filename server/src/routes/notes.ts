import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Получить все заметки
router.get('/', async (req, res) => {
  try {
    const notes = await prisma.note.findMany();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении заметок' });
  }
});

// Получить заметку по ID
router.get('/:id', async (req, res) => {
  try {
    const note = await prisma.note.findUnique({
      where: { id: req.params.id },
    });
    if (!note) {
      return res.status(404).json({ error: 'Заметка не найдена' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении заметки' });
  }
});

// Создать заметку
router.post('/', async (req, res) => {
  try {
    const { title, content, categoryId } = req.body;
    const note = await prisma.note.create({
      data: {
        title,
        content,
        categoryId,
      },
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании заметки' });
  }
});

// Обновить заметку
router.put('/:id', async (req, res) => {
  try {
    const { title, content, categoryId } = req.body;
    const note = await prisma.note.update({
      where: { id: req.params.id },
      data: {
        title,
        content,
        categoryId,
      },
    });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении заметки' });
  }
});

// Удалить заметку
router.delete('/:id', async (req, res) => {
  try {
    await prisma.note.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении заметки' });
  }
});

export default router;
