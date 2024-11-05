import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Очищаем существующие записи
  await prisma.note.deleteMany({});
  await prisma.category.deleteMany({});

  // Создаем категории
  const categories = [{ name: "Работа" }, { name: "Личное" }, { name: "Идеи" }];

  const createdCategories = await Promise.all(
    categories.map((category) =>
      prisma.category.create({
        data: category,
      })
    )
  );

  const notes = [
    {
      title: "Note-1",
      content: "Равным образом начало повседневной работы...",
      categoryId: createdCategories[0].id, // Работа
    },
    {
      title: "Note-2",
      content: "С другой стороны укрепление и развитие структуры...",
      categoryId: createdCategories[0].id, // Работа
    },
    {
      title: "Note-3",
      content: "Разнообразный и богатый опыт постоянное...",
      categoryId: createdCategories[1].id, // Личное
    },
    {
      title: "Note-4",
      content: "Товарищи! новая модель организационной...",
      categoryId: createdCategories[1].id, // Личное
    },
    {
      title: "Note-5",
      content: "Идейные соображения высшего порядка...",
      categoryId: createdCategories[2].id, // Идеи
    },
    {
      title: "Note-6",
      content: "Повседневная практика показывает...",
      categoryId: createdCategories[2].id, // Идеи
    },
    {
      title: "Note-7",
      content: "Значимость этих проблем настолько очевидна...",
      categoryId: createdCategories[2].id, // Идеи
    },
  ];

  for (const note of notes) {
    await prisma.note.create({
      data: note,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
