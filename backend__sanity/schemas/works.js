export default {
  name: 'works',
  title: 'Works',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'desc', title: 'Desc', type: 'string'},
    {name: 'projectLink', title: 'Project Link', type: 'string'},
    {name: 'codeLink', title: 'Code Link', type: 'string'},
    {name: 'imageUrl', title: 'ImgURL', type: 'image', options: {hotspot: true}},
    {name: 'tags', title: 'Tags', type: 'array', of: [{name: 'tag', title: 'Tag', type: 'string'}]},
  ],
}
