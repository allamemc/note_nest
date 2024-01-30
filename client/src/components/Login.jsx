import { useContext, useState } from 'react'

import { apiUsers } from '../api'
import { motion } from 'framer-motion'

import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function Login() {
	const [name, setName] = useState(null)
	const [password, setPassword] = useState(null)
	const [alert, setAlert] = useState(0)
	const { setUser, setNombre } = useContext(UserContext)
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()

		//check if name and password are correct
		if (name && password) {
			apiUsers.post('/login', { name, password }).then(() => {
				setUser(true)
				setNombre(name)
				navigate('/dashboard')
			})
		} else if (name === null) {
			setAlert(1)
		} else if (password === null) {
			setAlert(2)
		}
	}

	return (
		<>
			<div className='min-h-screen hero bg-base-200'>
				<div className='flex-col w-full hero-content lg:flex-row-reverse'>
					<div className='w-full max-w-md card shrink-0 '>
						<form className='card-body' onSubmit={handleSubmit}>
							<h2 className='text-4xl font-black text-center'>Note Nest</h2>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Name</span>
								</label>
								<motion.input
									type='text'
									placeholder='Name'
									value={name}
									onChange={(e) => setName(e.target.value)}
									className='border-0 input input-bordered'
								/>
							</div>
							{alert === 1 ? (
								<motion.div
									className='gap-2 badge badge-error'
									initial={{ opacity: 0, scale: 0, x: -100 }}
									animate={{ opacity: 1, scale: 1, x: 0 }}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										className='inline-block w-4 h-4 stroke-current'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M6 18L18 6M6 6l12 12'></path>
									</svg>
									Completa este campo
								</motion.div>
							) : null}

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
								/>
							</div>
							{alert === 2 ? (
								<motion.div
									className='gap-2 badge badge-error'
									initial={{ opacity: 0, scale: 0, x: -100 }}
									animate={{ opacity: 1, scale: 1, x: 0 }}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										className='inline-block w-4 h-4 stroke-current'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M6 18L18 6M6 6l12 12'></path>
									</svg>
									Completa este campo
								</motion.div>
							) : null}
							<div className='mt-6 form-control'>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.97 }}
									className='text-gray-900 bg-gray-300 border-0 shadow-xl btn hover:bg-gray-400'
									type='submit'>
									Log In
								</motion.button>
							</div>
							<div className=' divider'>or</div>
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
