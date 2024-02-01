const express = require('express')
const router = express.Router()
const uuidv4 = require('uuid').v4

function generateSessionId() {
	return uuidv4()
}
const User = require('../models/User')

router.post('/login', async (req, res) => {
	const { name, password } = req.body

	if (name && password) {
		try {
			let user = await User.findOne({ name })

			if (!user) {
				// Si el usuario no existe, crea uno nuevo
				user = new User({ name, password })
				await user.save()
			} else {
				// Si el usuario existe, verifica la contraseña
				if (user.password !== password) {
					return res.status(401).json({ message: 'Incorrect password' })
				}
			}

			// Inicia sesión con el usuario
			req.session.user = { name: user.name, _id: user._id }
			const sessionId = generateSessionId()
			req.session.id = sessionId
			res.cookie('sessionId', sessionId, {
				httpOnly: true,
				maxAge: 90 * 24 * 60 * 60 * 1000,
			})
			return res.json({ message: 'Login successful' })
		} catch (err) {
			console.error(err)
			return res.status(500).json({ message: 'Internal server error' })
		}
	} else {
		return res.status(400).json({ message: 'Invalid input' })
	}
})

router.post('/guest', async (req, res) => {
	try {
		// Define el nombre y la contraseña del usuario invitado
		const guestName = 'Invitado'
		const guestPassword = '123'

		// Busca el usuario invitado en la base de datos
		let user = await User.findOne({ name: guestName })

		// Si el usuario invitado no existe, crea uno nuevo
		if (!user) {
			user = new User({ name: guestName, password: guestPassword })
			await user.save()
		}

		// Inicia sesión con el usuario invitado
		req.session.user = { name: user.name, _id: user._id }
		const sessionId = generateSessionId()
		req.session.id = sessionId
		res.cookie('sessionId', sessionId, {
			httpOnly: true,
			maxAge: 90 * 24 * 60 * 60 * 1000,
		})
		return res.json({ message: 'Login successful' })
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: 'Internal server error' })
	}
})

router.get('/me', (req, res) => {
	// Get the session from the request
	//and cookie
	const session = req.session

	// If there is a user in the session, return it
	if (session && session.user) {
		res.json(session.user)
	} else {
		res.json({
			message: 'Not authenticated',
			session: session,
			user: session.user,
		})
	}
})

router.post('/logout', (req, res) => {
	// Destroy the session
	req.session.destroy()

	// Remove the session ID from the cookie
	res.clearCookie('sessionId')

	res.json({ message: 'Logged out' })
})

module.exports = router
