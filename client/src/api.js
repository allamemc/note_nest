import axios from 'axios'

const apiUsers = axios.create({
	baseURL: '/api/users/',
})

const apiNotes = axios.create({
	baseURL: '/api/notes/',
})

export { apiUsers, apiNotes }
