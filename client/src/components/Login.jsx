import { useContext, useState } from 'react'

import { apiUsers } from '../api'
import { motion } from 'framer-motion'

import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function Login() {
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const { setUser, setNombre } = useContext(UserContext)
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		apiUsers.post('/login', { name, password }).then(async () => {
			setUser(true)
			setNombre(name)
			navigate('/dashboard')
		})
	}

	return (
		<>
			<div className='min-h-screen hero bg-base-200'>
				<div className='flex-col w-full hero-content lg:flex-row-reverse'>
					<div className='w-full max-w-md card shrink-0 '>
						<form className='card-body' onSubmit={handleSubmit}>
							<h2 className='text-3xl font-black text-center'>Note Nest</h2>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Name</span>
								</label>
								<motion.input
									type='text'
									placeholder='Name'
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									className='input input-bordered'
								/>
							</div>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Password</span>
								</label>
								<motion.input
									type='password'
									placeholder='Password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className='input input-bordered'
									required
								/>
							</div>
							<div className='mt-6 form-control'>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.97 }}
									className='text-gray-900 bg-gray-300 border-0 shadow-xl btn hover:bg-gray-400'
									type='submit'>
									Iniciar Sesión
								</motion.button>
							</div>
							<div className='divider'>OR</div>
							<div className='flex w-full gap-5'>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.97 }}
									className='flex-1 text-3xl border-0 shadow-2xl btn bg-base-100 hover:bg-base-300'>
									<ion-icon name='logo-googleplus'></ion-icon>
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.97 }}
									className='flex-1 text-white shadow-2xl btn bg-slate-700 hover:bg-slate-800 '>
									Invitado
								</motion.button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default Login
