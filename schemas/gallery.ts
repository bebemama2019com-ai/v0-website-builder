export default {
  name: 'gallery',
  title: 'Галерия',
  type: 'document',
  fields: [
    {name: 'title', title: 'Албум', type: 'string'},
    {name: 'images', title: 'Снимки', type: 'array', of: [{type: 'image'}]},
  ]
}
