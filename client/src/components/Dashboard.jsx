import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { apiUsers } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
	const { setUser, name } = useContext(UserContext)
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		apiUsers.post('/logout').then(() => {
			setUser(false)
			navigate('/')
		})
	}

	return (
		<div className='h-screen '>
			<div className='flex '>
				<h1 className='text-4xl font-bold'>Tus Notas</h1>
				<p>@{name}</p>
			</div>
			<form onSubmit={handleSubmit}>
				<button className='btn bg-base-100' type='submit'>
					Logout
				</button>
			</form>
		</div>
	)
}
