// / <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 8080,
		proxy: {
			//API USUARIOS
			'/api/users/': 'https://s-note-nest.fly.dev/',
			//API NOTES
			'/api/notes/': 'https://s-note-nest.fly.dev/',
			//API GOOGLE
			'/api/google/': 'https://s-note-nest.fly.dev/',
		},
	},
	test: {
		environment: 'jsdom',
	},
})
