import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    video: true,
    videoCompression: 32,
    videosFolder: 'cypress/videos'
  }
})