const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const db = require('./config/db')
const userRoutes = require('./routes/users.routes')

const app = express()

db()

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

app.use('/api/users', userRoutes)

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port PORT ${PORT}`)
})
