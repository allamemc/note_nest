import axios from 'axios'

const apiUsers = axios.create({
	baseURL: '/api/users/',
})

const apiGoogle = axios.create({
	baseURL: '/api/google/',
})

const apiNotes = axios.create({
	baseURL: '/api/notes/',
})

export { apiUsers, apiNotes, apiGoogle }
