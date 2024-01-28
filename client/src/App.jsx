import { useEffect, useState } from 'react'
import { apiUsers } from './api'

function App() {
	const [message, setMessage] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()

		apiUsers.post('/newUser', { name, password }).then((response) => {
			const data = response.data
			setMessage(data.message)
			// Store the session ID in localStorage
			localStorage.setItem('sessionId', data.sessionId)
		})
	}

	useEffect(() => {
		apiUsers.get().then((response) => {
			const data = response.data
			setMessage(data.message)
		})
	}, [])

	const handleClick = () => {
		apiUsers
			.get('/me')
			.then((response) => {
				console.log(response.data)
			})
			.catch(() => {
				console.log('No user')
			})
	}

	const handleSubmit2 = (e) => {
		e.preventDefault()
		apiUsers.post('/logout').then((response) => {
			console.log(response.data)
		})
	}

	return (
		<>
			<h1>Mensaje</h1>
			<h2>Servidor: {message}</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<br />
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<button type='submit'>Create User</button>
			</form>
			<h1>{user}</h1>
			<form onSubmit={handleSubmit2}>
				<button>Logout</button>
			</form>
			<button onClick={handleClick}>Check Session</button>
		</>
	)
}

export default App
