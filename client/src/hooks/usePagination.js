import { useState } from 'react'
import { notes } from '../mocks/notas'

export function usePagination() {
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
