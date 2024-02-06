const express = require('express')
const router = express.Router()
require('./passportGoogle')
const passport = require('passport')
const dotenv = require('dotenv')
dotenv.config()
const uuidv4 = require('uuid').v4

function generateSessionId() {
	return uuidv4()
}

router.get(
	'/',
	passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get(
	'/callback',
	passport.authenticate('google', {
		successRedirect: 'success',
		failureRedirect: 'failure',
	})
)

router.get('/success', (req, res) => {
	if (req.isAuthenticated()) {
		const sessionId = generateSessionId()
		req.session.id = sessionId
		req.session.user = {
			name: req.user.name,
			_id: req.user._id,
		}

		// Redirige al usuario a la página de inicio o dashboard en caso de autenticación exitosa
		return res.redirect('https://note-nest-es.vercel.app/dashboard')
	}
	// Redirige al usuario a la página de error en caso de fallo de autenticación
	return res.redirect('https://note-nest-es.vercel.app/error')
})

router.get('/failure', (req, res) => {
	res.status(401).json({ message: 'Authentication failed' })
})

module.exports = router
