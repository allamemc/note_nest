const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.post('/login', async (req, res) => {
	const { name, password } = req.body

	if (name && password) {
		try {
			let user = await User.findOne({ name })

			if (user) {
				// User exists, check password
				if (user.password === password) {
					// Password is correct
					req.session.user = { name }
					const sessionId = generateSessionId()
					req.session.id = sessionId
					res.cookie('sessionId', sessionId, {
						httpOnly: true,
						maxAge: 90 * 24 * 60 * 60 * 1000,
					})
					return res.json({ message: 'Login successful' })
				} else {
					// Password is incorrect
					return res.status(401).json({ message: 'Incorrect password' })
				}
			} else {
				// User does not exist, create new user
				user = new User({ name, password })
				await user.save()
				req.session.user = { name }
				const sessionId = generateSessionId()
				req.session.id = sessionId
				res.cookie('sessionId', sessionId, {
					httpOnly: true,
					maxAge: 90 * 24 * 60 * 60 * 1000,
				})
				return res.json({ message: 'User created and logged in' })
			}
		} catch (err) {
			console.error(err)
			return res.status(500).json({ message: 'Internal server error' })
		}
	} else {
		return res.status(400).json({ message: 'Invalid input' })
	}
})

router.get('/me', (req, res) => {
	// Get the session from the request
	const session = req.session

	// If there is a user in the session, return it
	if (session && session.user) {
		res.json(session.user)
	} else {
		res.json({ message: 'Not authenticated' })
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
