export default {
  name: 'pageContent',
  title: 'Страници',
  type: 'document',
  fields: [
    {name: 'title', title: 'Заглавие', type: 'string'},
    {name: 'slug', title: 'Идентификатор', type: 'slug'},
    {name: 'content', title: 'Съдържание', type: 'array', of: [{type: 'block'}]},
  ]
}
