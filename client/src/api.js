import axios from 'axios'

//headers and cookies configuration
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.headers.delete['Content-Type'] = 'application/json'
axios.defaults.headers.get['Content-Type'] = 'application/json'

const apiUsers = axios.create({
	baseURL: 'https://s-note-nest.fly.dev/api/users/',
})

const apiGoogle = axios.create({
	baseURL: 'https://s-note-nest.fly.dev/api/google/',
})

const apiNotes = axios.create({
	baseURL: 'https://s-note-nest.fly.dev/api/notes/',
})

export { apiUsers, apiNotes, apiGoogle }
