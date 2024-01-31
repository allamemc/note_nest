import { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import { apiNotes } from '../api'
import { UserContext } from '../context/UserContext'
import ModalDelete from './ModalDelete'

function Note({ note }) {
	const [title, setTitle] = useState(note.title)
	const [content, setContent] = useState(note.content)
	const [loader, setLoader] = useState(false)
	const [_id, setId] = useState(null)

	const { id } = useContext(UserContext)

	useEffect(() => {
		setTitle(note.title)
		setContent(note.content)
		if (note._id) setId(note._id)
	}, [note])

	const saveNote = () => {
		if (_id) {
			apiNotes.put(`/update/${_id}`, { title, content, _id }).then(() => {
				setTitle(title)
				setContent(content)
				window.location.reload()
			})
		} else {
			apiNotes.post(`/create/${id}`, { title, content }).then(() => {
				setTitle(title)
				setContent(content)
				window.location.reload()
			})
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		apiNotes.delete(`/delete/${_id}`).then(() => {
			setLoader(true)
			setTitle('')
			setContent('')
			setId(null)
			window.location.reload()
		})
	}

	return (
		<>
			<motion.div className='w-full mb-5 note-overlay '>
				<motion.div className='w-full note-content'>
					<motion.div
						className='flex w-full gap-5'
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.3 }}>
						<motion.input
							className='mb-4 text-2xl font-bold input'
							placeholder='Título'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						{note._id ? (
							<motion.button
								className='text-2xl border-0 shadow-xl btn btn-circle hover:bg-base-100 bg-base-300'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.97 }}
								initial={{ opacity: 0, scale: 0, x: 100 }}
								animate={{ opacity: 1, scale: 1, x: 0 }}
								transition={{ duration: 0.5 }}
								onClick={() =>
									document.getElementById('my_modal_1').showModal()
								}>
								<ion-icon name='trash'></ion-icon>
							</motion.button>
						) : (
							<motion.button
								className='text-2xl border-0 shadow-xl btn btn-circle hover:bg-base-100 bg-base-300'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.97 }}
								initial={{ opacity: 0, scale: 0, x: 100 }}
								animate={{ opacity: 1, scale: 1, x: 0 }}
								transition={{ duration: 0.5 }}
								onClick={() =>
									note._id
										? document.getElementById('my_modal_1').showModal()
										: document.getElementById('my_modal_2').showModal()
								}>
								<ion-icon name='trash'></ion-icon>
							</motion.button>
						)}
					</motion.div>
					<motion.textarea
						className='w-full resize-none textarea'
						style={{ minHeight: '360px' }}
						placeholder='Contenido'
						value={content}
						onChange={(e) => setContent(e.target.value)}
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}></motion.textarea>
				</motion.div>
				<motion.button
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.7 }}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.97 }}
					onClick={saveNote}
					style={{ marginTop: '10px' }}
					className='border-0 shadow-xl btn bg-base-300 hover:bg-base-200'>
					Guardar cambios
				</motion.button>
			</motion.div>

			<ModalDelete handleSubmit={handleSubmit} loader={loader} />
		</>
	)
}

export default Note
