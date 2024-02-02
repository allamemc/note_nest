import { createContext, useState } from 'react'
import { apiUsers } from '../api'

export const UserContext = createContext({})

export function UserProvider({ children }) {
	const userLocalStorage = localStorage.getItem('user')
	const [user, setUser] = useState(userLocalStorage ? true : false)
	const [name, setNombre] = useState(null)

	const [id, setId] = useState(null)

	async function fetchUserData() {
		try {
			const response = await apiUsers.get('/me', {
				withCredentials: true,
				Cookie: document.cookie,
				credentials: 'include',
			})
			if (response.data.name) {
				setUser(true)
				setNombre(response.data.name)
				setId(response.data._id)
				localStorage.setItem('user', response.data.name)
				return response.data._id // Devolver la ID obtenida
			} else {
				setUser(false)
				setNombre(null)
				setId(null)
				localStorage.removeItem('user')
				return
			}
		} catch (error) {
			console.error('Error al obtener los datos del usuario:', error)
			return null // Manejar el error devolviendo null
		}
	}
	fetchUserData()

	return (
		<UserContext.Provider
			value={{ user, setUser, name, setNombre, id, setId, fetchUserData }}>
			{children}
		</UserContext.Provider>
	)
}
