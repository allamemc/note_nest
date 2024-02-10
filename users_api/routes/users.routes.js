const express = require('express')
const router = express.Router()
const uuidv4 = require('uuid').v4

function generateSessionId() {
	return uuidv4()
}
const User = require('../models/User')

router.post('/login', async (req, res) => {
	const { name, password } = req.body

	if (!name || !password) {
		return res.status(400).json({ message: 'Invalid input' })
	}

	try {
		let user = await User.findOne({ name })

		if (!user) {
			// Si el usuario no existe, crea uno nuevo
			user = new User({ name, password })
			await user.save()
		} else if (user.password !== password) {
			// Si el usuario existe, verifica la contraseña
			return res.status(401).json({ message: 'Incorrect password' })
		}

		// Inicia sesión con el usuario invitado
		const sessionId = generateSessionId() // Asegúrate de que esta función genere un ID único
		req.session.customId = sessionId
		req.session.user = { name: user.name, _id: user._id }

		return res.redirect('https://note-nest.fly.dev/dashboard')
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: 'Internal server error' })
	}
})

router.post('/guest', async (req, res) => {
	try {
		// Define el nombre y la contraseña del usuario invitado
		const guestName = 'Invitado'
		// Busca el usuario invitado en la base de datos
		let user = await User.findOne({ name: guestName })

		const sessionId = generateSessionId() // Asegúrate de que esta función genere un ID único
		req.session.id = sessionId
		req.session.user = { name: user.name, _id: user._id }

		return res.redirect('https://note-nest.fly.dev/dashboard')

		// Inicia sesión con el usuario invitado
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: 'Internal server error' })
	}
})

router.get('/me', (req, res) => {
	// Get the session from the request
	const session = req.session

	// If there is no session or no user in the session, return not authenticated
	if (!session || !session.user) {
		return res.status(401).json({ message: 'Not authenticated' })
	}

	// Return the user from the session
	return res.json(session.user)
})

router.get('/logout', (req, res) => {
	if (req.session) {
		req.session.destroy()
		res.json({ message: 'Logout successful' })
	}
})

module.exports = router
