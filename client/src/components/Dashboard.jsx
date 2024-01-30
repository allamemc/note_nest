import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { notes } from '../mocks/notas.json'
import { useNote } from '../hooks/useNote'
import { logout } from '../service/login'
import Note from './Note'
import Modal from './Modal'

export default function Dashboard() {
	const { setUser, name } = useContext(UserContext)
	const { selectedNote, showNote, closeNote } = useNote()

	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		logout({ setUser, navigate })
	}

	return (
		<div className='flex justify-center min-h-screen bg-base-200'>
			<div className='flex flex-col items-center justify-center w-1/2'>
				<div className='flex flex-col'>
					<h1 className='text-4xl font-bold'>Tus Notas</h1>
					<div className='flex flex-col gap-4'>
						{notes.map((note) => {
							return (
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.97 }}
									onClick={() => showNote(note)}
									key={note.id}>
									<div className='w-48 p-3 overflow-hidden break-words rounded-lg bg-base-100 min-h-11'>
										<h2>{note.title.substring(0, 15)}...</h2>
										<p className='overflow-hidden text-overflow-ellipsis'>
											{note.content.substring(0, 15)}...
										</p>
									</div>
								</motion.button>
							)
						})}
					</div>
				</div>
			</div>
			{selectedNote && <Note note={selectedNote} onClose={closeNote} />}
			<div className='flex flex-col items-center justify-center w-1/2'>
				<div className='flex '>
					<p>@{name}</p>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.97 }}
						className='shadow-current btn btn-circle btn-sm bg-base-200 hover:bg-base-300'
						onClick={() => document.getElementById('my_modal_1').showModal()}>
						<ion-icon name='exit'></ion-icon>
					</motion.button>
				</div>
			</div>
			<Modal handleSubmit={handleSubmit} />
		</div>
	)
}
