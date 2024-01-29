const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const app = express()
const { v4: uuidv4 } = require('uuid')

function generateSessionId() {
	return uuidv4()
}

app.use(bodyParser.json())

app.use(
	session({
		secret: 'your secret here',
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
		},
	})
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser((user, done) => {
	done(null, user)
})

passport.use(
	new GoogleStrategy(
		{
			clientID:
				'65394186998-g0u8h2agp62pi13utnu0ebdmofjup000.apps.googleusercontent.com',
			clientSecret: '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',
			callbackURL: 'http://localhost:3001/auth/google/callback',
		},
		function (accessToken, refreshToken, profile, cb) {
			// Aquí puedes guardar la información del usuario en tu base de datos si lo deseas
			return cb(null, profile)
		}
	)
)

app.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
)

app.get(
	'/auth/google/callback',
	passport.authenticate('google', { failureRedirect: '/login' }),
	function (req, res) {
		res.json({ message: 'User created' })
	}
)

app.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

app.get('/api/users', (req, res) => {
	res.json({ message: 'Hello World' })
})

app.post('/api/users/newUser', (req, res) => {
	const { name, password } = req.body
	if (name && password) {
		// Create session
		req.session.user = { name }

		// Generate a unique session ID
		const sessionId = generateSessionId()

		// Store the session ID in req.session
		req.session.id = sessionId

		// Send the session ID to the client in a httpOnly cookie
		res.cookie('sessionId', sessionId, {
			httpOnly: true,
			maxAge: 90 * 24 * 60 * 60 * 1000,
		})

		res.json({ message: 'User created' })
		console.log(req.session.user)
	} else {
		res.json({ message: 'Error' })
	}
})

app.get('/api/users/me', (req, res) => {
	// Get the session from the request
	const session = req.session

	// If there is a user in the session, return it
	if (session && session.user) {
		res.json(session.user)
	} else {
		res.json({ message: 'Not authenticated' })
	}
})

app.post('/api/users/logout', (req, res) => {
	// Destroy the session
	req.session.destroy()

	// Remove the session ID from the cookie
	res.clearCookie('sessionId')

	res.json({ message: 'Logged out' })
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port PORT ${PORT}`)
})
