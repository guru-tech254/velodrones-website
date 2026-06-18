export default {
  name: 'project',
  title: 'Portfolio Projects',
  type: 'document',
  fields: [
    { name: 'title', title: 'Project Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'category', title: 'Service Category', type: 'string', options: {
        list: [
          { title: 'Industrial Inspection', value: 'inspection' },
          { title: 'Drone Mapping', value: 'mapping' },
          { title: 'LiDAR Surveying', value: 'lidar' },
          { title: 'Aerial Surveillance', value: 'surveillance' }
        ]
      }, validation: Rule => Rule.required()
    },
    { name: 'thumbnail', title: 'Thumbnail Image', type: 'image', options: { hotspot: true }, validation: Rule => Rule.required() },
    { name: 'videoUrl', title: 'Video URL (Mux/Cloudinary)', type: 'url' },
    { name: 'challenge', title: 'The Challenge', type: 'text', rows: 3, validation: Rule => Rule.required() },
    { name: 'solution', title: 'Our Solution', type: 'text', rows: 3, validation: Rule => Rule.required() },
    { name: 'roi', title: 'Measurable ROI / Result', type: 'string', validation: Rule => Rule.required() },
    { name: 'published', title: 'Published', type: 'boolean', initialValue: true }
  ],
  preview: {
    select: { title: 'title', category: 'category', media: 'thumbnail' },
    prepare(selection) { return { title: selection.title, subtitle: selection.category }; }
  }
}