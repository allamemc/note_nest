import { useState, useEffect } from 'react'

function Note({ note }) {
	const [title, setTitle] = useState(note.title)
	const [content, setContent] = useState(note.content)

	useEffect(() => {
		setTitle(note.title)
		setContent(note.content)
	}, [note])

	return (
		<div className=' note-overlay'>
			<div className='note-content'>
				<input
					className='w-full max-w-xs text-2xl input'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
					className='w-full max-w-xs text-2xl input'
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
			</div>
		</div>
	)
}

export default Note
