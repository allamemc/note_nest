import { createContext, useEffect, useState } from 'react'
import { apiUsers } from '../api'

export const UserContext = createContext({})

export function UserProvider({ children }) {
	const userLocalStorage = localStorage.getItem('user')
	const [user, setUser] = useState(userLocalStorage ? true : false)
	const [name, setNombre] = useState(null)

	useEffect(() => {
		apiUsers.get('/me').then((response) => {
			if (response.data.name) {
				setUser(true)
				setNombre(response.data.name)
				localStorage.setItem('user', response.data.name)
			} else {
				setUser(false)
				setNombre(null)
				localStorage.removeItem('user')
			}
		})
	}, [])

	return (
		<UserContext.Provider value={{ user, setUser, name, setNombre }}>
			{children}
		</UserContext.Provider>
	)
}
