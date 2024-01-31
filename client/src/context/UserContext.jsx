import { createContext, useState } from 'react'
import { apiUsers } from '../api'

export const UserContext = createContext({})

export function UserProvider({ children }) {
	const userLocalStorage = localStorage.getItem('user')
	const [user, setUser] = useState(userLocalStorage ? true : false)
	const [name, setNombre] = useState(null)
	const [id, setId] = useState(null)

	apiUsers.get('/me').then((response) => {
		if (response.data.name) {
			setUser(true)
			setNombre(response.data.name)
			setId(response.data._id)
			localStorage.setItem('user', response.data.name)
		} else {
			setUser(false)
			setNombre(null)
			setId(null)
			localStorage.removeItem('user')
		}
	})

	return (
		<UserContext.Provider value={{ user, setUser, name, setNombre, id, setId }}>
			{children}
		</UserContext.Provider>
	)
}
