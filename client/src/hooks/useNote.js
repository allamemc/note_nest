import { useState } from 'react'

export function useNote() {
	const [selectedNote, setSelectedNote] = useState(null)
	const showNote = (note) => {
		setSelectedNote(note)
	}

	const closeNote = () => {
		setSelectedNote(null)
	}

	return { selectedNote, showNote, closeNote }
}
