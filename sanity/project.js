export default {
  name: 'project',
  title: 'Portfolio Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required().min(5).max(100)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Service Category',
      type: 'string',
      options: {
        list: [
          { title: 'Industrial Inspection', value: 'inspection' },
          { title: 'Drone Mapping', value: 'mapping' },
          { title: 'LiDAR Surveying', value: 'lidar' },
          { title: 'Aerial Surveillance', value: 'surveillance' },
          { title: '3D Modeling', value: '3d-modeling' },
          { title: 'Other', value: 'other' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility'
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'videoUrl',
      title: 'Video URL (Mux/Cloudinary)',
      type: 'url',
      description: 'Optional: Link to hosted video (Mux, Cloudinary, or Vimeo)'
    },
    {
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      rows: 3,
      description: 'What problem did the client face?',
      validation: Rule => Rule.required()
    },
    {
      name: 'solution',
      title: 'Our Solution',
      type: 'text',
      rows: 3,
      description: 'How did Velodrones solve it?',
      validation: Rule => Rule.required()
    },
    {
      name: 'roi',
      title: 'Measurable ROI / Result',
      type: 'string',
      description: 'e.g., "Saved $15k in scaffolding costs" or "Completed in 2 days vs 2 weeks"',
      validation: Rule => Rule.required()
    },
    {
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'location',
      title: 'Project Location',
      type: 'string',
      description: 'e.g., "Nairobi, Kenya"'
    },
    {
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date'
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Show on portfolio page',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'thumbnail'
    },
    prepare(selection) {
      const { title, category } = selection;
      return {
        title: title,
        subtitle: category
      };
    }
  }
}