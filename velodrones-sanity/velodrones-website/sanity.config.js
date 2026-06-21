import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import project from "./project.js"

export default defineConfig({
  name: 'velodrones-portfolio',
  title: 'Velodrones Portfolio',
  projectId: '6utlniqd', // <--- MAKE SURE YOUR ACTUAL PROJECT ID IS HERE
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [project], // Pass the project directly into the types array
  },
})