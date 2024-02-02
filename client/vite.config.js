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
			'/api/users/': 'https://users-api-dev-spcp.2.ie-1.fl0.io/',
			//API NOTES
			'/api/notes/': 'https://users-api-dev-spcp.2.ie-1.fl0.io/',
			//API GOOGLE
			'/api/google/': 'https://users-api-dev-spcp.2.ie-1.fl0.io/',
		},
	},
	test: {
		environment: 'jsdom',
	},
})
