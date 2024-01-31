import { useContext, useState } from 'react'

import { apiUsers } from '../api'
import { motion } from 'framer-motion'

import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function Login() {
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [alert, setAlert] = useState(0)
	const [loader, setLoader] = useState(false)
	const { setUser, setNombre } = useContext(UserContext)
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		const buttonClicked = e.nativeEvent.submitter.id

		if (buttonClicked === 'google-button') {
			setLoader(true)
			window.location.href = 'http://localhost:3001/api/google'
		} else if (buttonClicked === 'login-button') {
			if (name && password) {
				setLoader(true)
				apiUsers
					.post('/login', { name, password })
					.then(() => {
						setUser(true)
						setNombre(name)
						navigate('/dashboard')
					})
					.catch((error) => {
						setLoader(false)
						if (error.response && error.response.status === 401) {
							setAlert(3)
						}
					})
			} else if (name === '') {
				setAlert(1)
			} else if (password === '') {
				setAlert(2)
			}
		} else if (buttonClicked === 'guest-button') {
			setLoader(true)
			apiUsers
				.post('/guest')
				.then(() => {
					setUser(true)
					setNombre('Invitado')
					navigate('/dashboard')
				})
				.catch((error) => {
					setLoader(false)
					if (error.response && error.response.status === 401) {
						setAlert(3)
					}
				})
		}
	}

	return (
		<>
			<div className='min-h-screen hero bg-base-200'>
				<div className='flex-col w-full hero-content lg:flex-row-reverse'>
					<div className='w-full max-w-md card shrink-0 '>
						<form className='card-body' onSubmit={handleSubmit}>
							<div className='flex justify-center '>
								<h2 className='text-4xl font-black text-center'>Note Nest</h2>
							</div>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Nombre</span>
								</label>
								<motion.input
									whileFocus={{ x: 5 }}
									type='text'
									placeholder='John Doe'
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
									Completa el nombre
								</motion.div>
							) : null}

							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Contraseña</span>
								</label>
								<motion.input
									whileFocus={{ x: 5 }}
									type='password'
									placeholder='*******'
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
									Completa la contraseña
								</motion.div>
							) : null}
							{alert === 3 ? (
								<motion.div
									className='gap-2 badge badge-warning'
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
									Contraseña incorrecta
								</motion.div>
							) : null}
							<div className='mt-6 form-control'>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.97 }}
									id='login-button'
									className='text-gray-900 bg-gray-300 border-0 shadow-xl btn hover:bg-gray-400'
									type='submit'>
									{loader ? (
										<span className='loading loading-spinner loading-sm'></span>
									) : (
										'Ver tus Notas'
									)}
								</motion.button>
							</div>
							<div className=' divider'>or</div>
							<div className='flex w-full gap-5'>
								<motion.button
									id='google-button'
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.97 }}
									className='flex-1 text-3xl border-0 shadow-2xl btn bg-base-100 hover:bg-base-300'>
									{loader ? (
										<span className='loading loading-spinner loading-sm'></span>
									) : (
										<ion-icon name='logo-google'></ion-icon>
									)}
								</motion.button>
								<motion.button
									id='guest-button'
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.97 }}
									className='flex-1 text-white shadow-2xl btn bg-slate-700 hover:bg-slate-800 '>
									{loader ? (
										<span className='loading loading-spinner loading-sm'></span>
									) : (
										'Invitado'
									)}
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
