import axios from 'axios'

const apiUsers = axios.create({
	baseURL: 'https://server-note-nest-dev-rxzx.2.ie-1.fl0.io/api/users/',
})

const apiGoogle = axios.create({
	baseURL: 'https://server-note-nest-dev-rxzx.2.ie-1.fl0.io/api/google/',
})

const apiNotes = axios.create({
	baseURL: 'https://server-note-nest-dev-rxzx.2.ie-1.fl0.io/api/notes/',
})

export { apiUsers, apiNotes, apiGoogle }
