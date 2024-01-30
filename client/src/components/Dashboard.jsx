import { useContext, useEffect, useState } from 'react'
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
		<div>
			<h1>Dashboard</h1>
			<p>{name}</p>
			<form onSubmit={handleSubmit}>
				<button className='btn' type='submit'>
					Logout
				</button>
			</form>
		</div>
	)
}
