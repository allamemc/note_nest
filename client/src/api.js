import axios from 'axios'

const apiUsers = axios.create({
	baseURL: 'https://server-note-nest-s.fly.dev/api/users/',
})

const apiGoogle = axios.create({
	baseURL: 'https://server-note-nest-s.fly.dev/api/google/',
})

const apiNotes = axios.create({
	baseURL: 'https://server-note-nest-s.fly.dev/api/notes/',
})

export { apiUsers, apiNotes, apiGoogle }
