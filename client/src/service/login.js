import { apiUsers } from '../api'

export function logout({ setUser, navigate }) {
	apiUsers.get('/logout').then(() => {
		setUser(false)
		localStorage.removeItem('user')
		navigate('/')
	})
}
