# Notes Application Server

Серверная часть приложения для создания заметок, построенная с использованием Express.js, TypeScript, Prisma и PostgreSQL.

## Требования

- Node.js (версия 14 или выше)
- PostgreSQL (версия 10 или выше)
- npm или yarn

## Установка

1. Установите зависимости:

```bash
npm install
```

3. Создайте файл `.env` в корневой папке сервера и настройте переменные окружения:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/notes_db?schema=public"
PORT=3000
```

Замените `user`, `password` на ваши учетные данные PostgreSQL.

1. Выполните миграции базы данных:

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma seed
```

## Запуск приложения

### Режим разработки

```bash
npm run dev
```

Сервер запустится на порту 3000 (или на порту, указанном в .env)

### Продакшен

1. Соберите приложение:

```bash
npm run build
```

2. Запустите сервер:

```bash
npm start
```

## API Endpoints

### Notes

- `GET /api/notes` - получить все заметки
- `GET /api/notes/:id` - получить заметку по ID
- `POST /api/notes` - создать новую заметку
- `PUT /api/notes/:id` - обновить заметку
- `DELETE /api/notes/:id` - удалить заметку

### Формат данных для создания/обновления заметки

```json
{
  "title": "Заголовок заметки",
  "content": "Содержание заметки"
}
```

## Структура проекта

```
server/
├── src/
│   ├── routes/
│   │   └── notes.ts
│   └── index.ts
├── prisma/
│   └── schema.prisma
├── .env
├── package.json
└── tsconfig.json
```

## Скрипты

- `npm run dev` - запуск сервера в режиме разработки с hot-reload
- `npm run build` - сборка проекта
- `npm start` - запуск собранного проекта

## Примечания

- Сервер настроен для работы с клиентским приложением React из папки `client/`
- В режиме продакшена сервер раздает статические файлы клиентского приложения
- Для разработки рекомендуется запускать клиент и сервер отдельно
