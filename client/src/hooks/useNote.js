import { useState } from 'react'

export function useNote() {
	const [selectedNote, setSelectedNote] = useState({ title: '', content: '' })

	const showNote = (note) => {
		setSelectedNote(note)
	}

	return { selectedNote, showNote }
}
