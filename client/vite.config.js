import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			//API USUARIOS
			'/api/users/': 'http://localhost:3001',
			//API AUTH
			'/api/auth/': 'http://localhost:3000',
			//API POSTS
			'/api/posts/': 'http://localhost:3000',
		},
	},
})
