import { useState } from 'react'

import { useEffect } from 'react'
import { apiNotes } from '../api'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export function useNote() {
	const [notes, setNotes] = useState([])
	const { id } = useContext(UserContext)

	useEffect(() => {
		apiNotes.get(`/${id}`).then((response) => {
			setNotes(response.data)
		})
	}, [id])

	return { notes }
}

export function usePagination() {
	const { notes } = useNote()

	const itemsPerPage = 5
	const pageCount = Math.ceil(notes.length / itemsPerPage)
	const [currentPage, setCurrentPage] = useState(1)

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const displayedNotes = notes.slice(startIndex, endIndex)

	return { pageCount, currentPage, handlePageChange, displayedNotes }
}
