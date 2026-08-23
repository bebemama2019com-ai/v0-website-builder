export default {
  name: 'news',
  title: 'Новини и Събития',
  type: 'document',
  fields: [
    {name: 'title', title: 'Заглавие', type: 'string'},
    {name: 'slug', title: 'Линк', type: 'slug', options: {source: 'title'}},
    {name: 'excerpt', title: 'Кратко описание', type: 'text'},
    {name: 'content', title: 'Съдържание', type: 'array', of: [{type: 'block'}]},
    {name: 'image', title: 'Снимка', type: 'image', options: {hotspot: true}},
    {name: 'category', title: 'Категория', type: 'string', options: {list: ['Новини', 'Събития', 'Дейности', 'Съобщения']}},
    {name: 'publishedAt', title: 'Дата', type: 'datetime', initialValue: () => new Date().toISOString()},
  ]
}
