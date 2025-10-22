-- Insert team members for ДГ 202
-- This script adds all staff members with cartoon-style avatar images

-- Pedagogical Staff
insert into public.team_members (name, role, bio, image_url, order_index) values
(
  'Петя Янкова',
  'Директор',
  'Висше магистър "Организация и управление на образованието" и свидетелство за придобито първо ПКС',
  '/placeholder.svg?height=400&width=400',
  1
),
(
  'Ренета Попгеоргиева',
  'Учител',
  'Магистър по „ПНУП"',
  '/placeholder.svg?height=400&width=400',
  2
),
(
  'Генка Нанкинска',
  'Учител',
  'Бакалавър по „ПУП"',
  '/placeholder.svg?height=400&width=400',
  3
);

-- Medical Specialists
insert into public.team_members (name, role, bio, image_url, order_index) values
(
  'Пенка Дамянова',
  'Медицински специалист',
  'Медицински специалист в детска градина',
  '/placeholder.svg?height=400&width=400',
  4
),
(
  'Фани Конакчиева',
  'Медицински специалист',
  'Медицински специалист в детска градина',
  '/placeholder.svg?height=400&width=400',
  5
),
(
  'Димитрийка Мангърова',
  'Медицински специалист',
  'Медицински специалист в яслена група',
  '/placeholder.svg?height=400&width=400',
  6
),
(
  'Татяна Калчева',
  'Медицински специалист',
  'Медицински специалист в яслена група',
  '/placeholder.svg?height=400&width=400',
  7
),
(
  'Адриана Костова',
  'Медицински специалист',
  'Медицински специалист в яслена група',
  '/placeholder.svg?height=400&width=400',
  8
),
(
  'Савка Иванова',
  'Медицински специалист',
  'Медицински специалист в яслена група',
  '/placeholder.svg?height=400&width=400',
  9
);

-- Other Staff
insert into public.team_members (name, role, bio, image_url, order_index) values
(
  'Деляна Сергиева',
  'Счетоводител',
  'Счетоводител на детската градина',
  '/placeholder.svg?height=400&width=400',
  10
),
(
  'Нели Шуманова',
  'ЗАС',
  'Заместник административен секретар',
  '/placeholder.svg?height=400&width=400',
  11
),
(
  'Лилия Сергиева',
  'Готвач',
  'Готвач в детската градина',
  '/placeholder.svg?height=400&width=400',
  12
),
(
  'Теменужка Кръстева',
  'Помощник-готвач',
  'Помощник-готвач в детската градина',
  '/placeholder.svg?height=400&width=400',
  13
),
(
  'Светла Пейкова',
  'Помощник-възпитател',
  'Помощник-възпитател в детската градина',
  '/placeholder.svg?height=400&width=400',
  14
),
(
  'Розалия Кьосева',
  'Помощник-възпитател',
  'Помощник-възпитател в детската градина',
  '/placeholder.svg?height=400&width=400',
  15
),
(
  'Лидия Петрова',
  'Помощник-възпитател',
  'Помощник-възпитател в детската градина',
  '/placeholder.svg?height=400&width=400',
  16
);

-- Security
insert into public.team_members (name, role, bio, image_url, order_index) values
(
  'Охранителна фирма „ГАРД" ЕООД',
  'Охрана',
  'Осигуряване на сигурност и охрана на детската градина',
  '/placeholder.svg?height=400&width=400',
  17
);
