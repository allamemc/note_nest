import { useState } from 'react'

import { useEffect } from 'react'
import { apiNotes } from '../api'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export function useNote() {
	const [notes, setNotes] = useState([])
	const { fetchUserData } = useContext(UserContext)

	async function fetchData() {
		const userId = await fetchUserData() // Esperar a que se obtenga la ID del usuario
		if (userId) {
			try {
				const response = await apiNotes.get(`/${userId}`)
				setNotes(response.data)
			} catch (error) {
				throw new Error(error)
			}
		}
	}

	useEffect(() => {
		fetchData() // Llamar a la función para obtener los datos
	}, [])

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
