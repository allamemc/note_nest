import { apiUsers } from '../api'

export function logout({ setUser, navigate }) {
	apiUsers.post('/logout').then(() => {
		setUser(false)
		navigate('/')
	})
}
