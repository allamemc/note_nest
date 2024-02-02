/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			//API USUARIOS
			'/api/users/': 'http://localhost:3000',
			//API NOTES
			'/api/notes/': 'http://localhost:3000',
			//API GOOGLE
			'/api/google/': 'http://localhost:3000',
		},
	},
	test: {
		environment: 'jsdom',
	},
})
