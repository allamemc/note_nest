import axios from 'axios'

const baseConfig = {
	withCredentials: true,
}

const apiUsers = axios.create({
	baseURL: 'https://server-note-nest-dev-rxzx.2.ie-1.fl0.io/api/users/',
	...baseConfig,
})

const apiGoogle = axios.create({
	baseURL: 'https://server-note-nest-dev-rxzx.2.ie-1.fl0.io/api/google/',
	...baseConfig,
})

const apiNotes = axios.create({
	baseURL: 'https://server-note-nest-dev-rxzx.2.ie-1.fl0.io/api/notes/',
	...baseConfig,
})

export { apiUsers, apiNotes, apiGoogle }
