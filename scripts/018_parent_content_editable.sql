-- Make the "За родители" pages editable from the admin panel.
-- Adds two columns to parent_content and seeds it with the content the pages had until now.
-- See lib/parent-content.ts for how each category uses the columns.

alter table public.parent_content
  add column if not exists subtitle text,
  add column if not exists icon text;

create unique index if not exists parent_content_slug_key on public.parent_content (slug);

insert into public.parent_content (category, slug, title, subtitle, content, icon, file_url, order_index, published) values
  ('schedule_group', 'schedule_group-1', '7:00 - 8:30', null, 'Прием на децата по групи; дейност по избор на децата; дейности, организирани от учителя; индивидуална работа и др.', 'sun', null, 0, true),
  ('schedule_group', 'schedule_group-2', '8:30 - 8:50', null, 'Сутрешно раздвижване; дейности по избор', 'sun', null, 1, true),
  ('schedule_group', 'schedule_group-3', '8:50 - 9:15', null, 'Сутрешна закуска', 'coffee', null, 2, true),
  ('schedule_group', 'schedule_group-4', '9:20 - 10:30', null, 'Педагогически ситуации, творчески игри, подвижни игри, ателиета', 'book', null, 3, true),
  ('schedule_group', 'schedule_group-5', '10:30', null, 'Подкрепителна закуска', 'coffee', null, 4, true),
  ('schedule_group', 'schedule_group-6', '10:40 - 11:50', null, 'Педагогически ситуации; дейност по избор на децата; дейности, организирани от учителя, подвижни игри, игри на открито', 'book', null, 5, true),
  ('schedule_group', 'schedule_group-7', '12:00', null, 'Обяд', 'utensils', null, 6, true),
  ('schedule_group', 'schedule_group-8', '12:30 - 13:00', null, 'Подготовка за сън', 'moon', null, 7, true),
  ('schedule_group', 'schedule_group-9', '13:00 - 15:00', null, 'Следобеден сън', 'moon', null, 8, true),
  ('schedule_group', 'schedule_group-10', '15:15 - 15:40', null, 'Следобедна закуска', 'coffee', null, 9, true),
  ('schedule_group', 'schedule_group-11', '15:40 - 18:30', null, 'Подвижни игри, педагогически ситуации; допълнителни дейности, дейност по избор на децата; дейности, организирани от учителя, игри на открито, изпращане на децата', 'sun', null, 10, true),
  ('schedule_nursery', 'schedule_nursery-1', '7:00 - 8:30', null, 'Сутрешен прием. Дейности по избор на децата. Дейности, организирани от медицинската сестра (комуникативни игри за адаптация и социализиране)', 'sun', null, 0, true),
  ('schedule_nursery', 'schedule_nursery-2', '8:35 - 8:50', null, 'Утринно раздвижване (гимнастика, музикално-подвижни игри и др.)', 'sun', null, 1, true),
  ('schedule_nursery', 'schedule_nursery-3', '8:55 - 9:15', null, 'Подготовка за закуска. Закуска', 'coffee', null, 2, true),
  ('schedule_nursery', 'schedule_nursery-4', '9:15 - 9:30', null, 'Тоалет (гърне, миене на ръце и др.)', 'baby', null, 3, true),
  ('schedule_nursery', 'schedule_nursery-5', '9:30 - 10:00', null, 'Дейности с образователна цел организирани от мед. сестри - разказване на приказки, слушане на музика, заучаване на художествени текстове, пеене и танци, изобразителна дейност, модели за овладяване на навици за самообслужване, култура на поведение и др.', 'book', null, 4, true),
  ('schedule_nursery', 'schedule_nursery-6', '10:00 - 10:20', null, 'Миене на ръце, подготовка и подкрепителна закуска (плод)', 'coffee', null, 5, true),
  ('schedule_nursery', 'schedule_nursery-7', '10:20 - 10:30', null, 'Тоалет (гърне)', 'baby', null, 6, true),
  ('schedule_nursery', 'schedule_nursery-8', '10:30 - 11:20', null, 'Игри и свободно реализирани дейности по избор (на открито или на закрито) - разходки, наблюдения, конструктивни и ролеви игри, музикално-подвижни игри и др. Дейности съобразно потребностите на децата', 'sun', null, 7, true),
  ('schedule_nursery', 'schedule_nursery-9', '11:25 - 11:45', null, 'Прибиране в занимарнята, тоалет (гърне, миене на ръце и др.)', 'baby', null, 8, true),
  ('schedule_nursery', 'schedule_nursery-10', '11:50 - 12:20', null, 'Подготовка за обяд. Обяд', 'utensils', null, 9, true),
  ('schedule_nursery', 'schedule_nursery-11', '12:20 - 15:30', null, 'Тоалет (гърне), подготовка за следобедна почивка и сън', 'moon', null, 10, true),
  ('schedule_nursery', 'schedule_nursery-12', '15:30 - 16:00', null, 'Следобеден тоалет (гърне, миене на ръце). Раздвижване (игри - подвижни, за раздвижване и емоционална нагласа)', 'baby', null, 11, true),
  ('schedule_nursery', 'schedule_nursery-13', '16:00 - 16:30', null, 'Подготовка за следобедна закуска. Закуска', 'coffee', null, 12, true),
  ('schedule_nursery', 'schedule_nursery-14', '16:30 - 19:00', null, 'Дейности, организирани от мед. спец. (на открито и закрито); игри и други свободно реализирани дейности - развлечения, театър, приказки, занимания на маси и др.', 'sun', null, 13, true),
  ('form', 'form-1', 'Декларация за защита на личните данни', null, 'Информирано писмено съгласие за обработване на лични данни на детето и родителя/родителите в ДГ № 202', null, '/documents/deklaracija-lichni-danni.pdf', 0, true),
  ('form', 'form-2', 'Декларация за взимане на дете', null, 'Декларация за правилата и отговорностите при взимане на детето от детската градина', null, '/documents/deklaracija-vzimane-na-dete.pdf', 1, true),
  ('council_member', 'council_member-1', 'Стефан Шабанов', 'Председател', 'Представител на родителите в ДГ № 202', null, null, 0, true),
  ('council_member', 'council_member-2', 'Елисавета Баджакова', 'Член', 'Представител на родителите в ДГ № 202', null, null, 1, true),
  ('council_member', 'council_member-3', 'Ивета Асенова', 'Член', 'Представител на родителите в ДГ № 202', null, null, 2, true),
  ('council_member', 'council_member-4', 'Цветелина Серафимова', 'Член', 'Представител на родителите в ДГ № 202', null, null, 3, true),
  ('council_member', 'council_member-5', 'Светлана Дякова', 'Член', 'Представител на финансиращия орган', null, null, 4, true),
  ('council_reserve', 'council_reserve-1', 'Вера Димитрова', null, 'Представител на родителите', null, null, 0, true),
  ('council_reserve', 'council_reserve-2', 'Петя Лакова', null, 'Представител на родителите', null, null, 1, true),
  ('council_reserve', 'council_reserve-3', 'Деница Николова', null, 'Представител на родителите', null, null, 2, true),
  ('council_reserve', 'council_reserve-4', 'Моника Петрова', null, 'Представител на родителите', null, null, 3, true),
  ('council_reserve', 'council_reserve-5', 'Милена Кръстева', null, 'Представител на финансиращия орган', null, null, 4, true),
  ('council_document', 'council_document-1', 'Устав на Обществения съвет', null, 'Устав на Обществения съвет при ДГ № 202', null, '/documents/ustav-obshtestven-savet.pdf', 0, true),
  ('council_document', 'council_document-2', 'Заповед за състав', null, 'Заповед за утвърждаване членовете на Обществения съвет за уч. 2025/2026г.', null, '/documents/zapoved-obshtestven-savet.pdf', 1, true),
  ('setting', 'daily_schedule_badge', 'Дневен режим – учебна година (надпис над заглавието)', null, 'Учебна 2025/2026 г.', null, null, 0, true),
  ('setting', 'council_intro', 'Обществен съвет – текст под заглавието', null, 'Обществения съвет в ДГ № 202 за учебната 2025/2026г. с мандат 3 години', null, null, 1, true)
on conflict (slug) do nothing;
