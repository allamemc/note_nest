import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePagination } from '../hooks/usePagination'
import { useNote } from '../hooks/useNote'
import { logout } from '../service/login'
import Pagination from './Pagination'
import Note from './Note'
import Modal from './Modal'
import './Dashboard.css'

export default function Dashboard() {
	// const { userData } = useContext(UserContext)
	const { setUser, name } = useContext(UserContext)
	const { selectedNote, showNote } = useNote()
	const [loader, setLoader] = useState(false)

	const { pageCount, currentPage, handlePageChange, displayedNotes } =
		usePagination()

	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		setLoader(true)
		logout({ setUser, navigate })
	}

	const container = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.4,
				staggerChildren: 0.2,
			},
		},
	}

	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	}

	return (
		<div className='flex items-center self-center justify-center min-h-screen bg-base-200'>
			<div className='flex gap-10' style={{ minHeight: '552px' }}>
				<div className='flex movil'>
					<div className='flex flex-col'>
						<h1 className='mb-5 text-4xl font-black border-b-4 border-base-300'>
							Tus Notas
						</h1>

						<motion.div
							className='flex flex-col gap-4'
							variants={container}
							initial='hidden'
							animate='visible'>
							{displayedNotes.map((note, index) => (
								<motion.button
									key={index}
									variants={item}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.97 }}
									onClick={() => showNote(note)}>
									<div className='w-48 p-3 overflow-hidden text-left break-words rounded-lg bg-base-100 min-h-11'>
										<h2 className='font-bold'>{note.title.substring(0, 15)}</h2>
										<p className='overflow-hidden text-overflow-ellipsis'>
											{note.content.substring(0, 20)}..
										</p>
									</div>
								</motion.button>
							))}

							<div className='flex justify-center '>
								<Pagination
									count={pageCount}
									page={currentPage}
									onChange={handlePageChange}
									createNote={() => showNote({ title: '', content: '' })}
									color='primary'
								/>
							</div>
						</motion.div>
					</div>
				</div>
				<div className='flex flex-col w-full gap-5'>
					<div className='flex items-center self-end gap-3 mb-3'>
						<p className='font-bold'>@{name}</p>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.97 }}
							className='border-0 shadow-xl btn btn-sm bg-base-300 hover:bg-base-100'
							onClick={() => document.getElementById('my_modal_3').showModal()}>
							<ion-icon name='exit'></ion-icon>
						</motion.button>
					</div>

					<Note
						note={selectedNote ? selectedNote : { title: '', content: '' }}
					/>
				</div>
			</div>
			<Modal handleSubmit={handleSubmit} loader={loader} />
		</div>
	)
}
