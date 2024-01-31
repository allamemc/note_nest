import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function Note({ note }) {
	const [title, setTitle] = useState(note.title)
	const [content, setContent] = useState(note.content)

	useEffect(() => {
		setTitle(note.title)
		setContent(note.content)
	}, [note])

	return (
		<div className='w-full mb-5 note-overlay '>
			<div className='w-full note-content'>
				<motion.input
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1 }}
					className='w-full mb-4 text-2xl font-bold input'
					placeholder='Título'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<motion.textarea
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1 }}
					className='w-full resize-none textarea'
					style={{ minHeight: '360px' }}
					placeholder='Contenido'
					value={content}
					onChange={(e) => setContent(e.target.value)}></motion.textarea>

				<button className='border-0 shadow-xl btn bg-base-300 hover:bg-base-200'>
					<ion-icon name='add-outline'></ion-icon>
				</button>
			</div>
		</div>
	)
}

export default Note
