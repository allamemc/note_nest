import { useEffect, useState } from 'react'
import { apiUsers } from './api'

function App() {
	const [message, setMessage] = useState('')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()

		apiUsers.post('/newUser', { name, email, password }).then((response) => {
			const data = response.data
			setMessage(data.message)
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
				if (response.data) {
					console.log(response.data)
				} else {
					console.log('No user')
				}
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
			<h2>{message}</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
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
