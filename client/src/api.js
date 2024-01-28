import axios from 'axios'

const apiUsers = axios.create({
	baseURL: '/api/users/',
})

const apiAuth = axios.create({
	baseURL: '/api/auth/',
})

const apiPosts = axios.create({
	baseURL: '/api/posts/',
})

export { apiUsers, apiAuth, apiPosts }
