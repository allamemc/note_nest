import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			//API USUARIOS
			'/api/users/': 'https://server-note-nest.fly.dev/',
			//API NOTES
			'/api/notes/': 'https://server-note-nest.fly.dev/',
			//API GOOGLE
			'/api/google/': 'https://server-note-nest.fly.dev/',
		},
	},
})
