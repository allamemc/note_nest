import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			//API USUARIOS
			'/api/users/': 'http://localhost:3001',
			//API NOTES
			'/api/notes/': 'http://localhost:3001',
			//API GOOGLE
			'/api/google/': 'http://localhost:3001',
		},
	},
})
