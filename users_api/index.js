const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const db = require('./config/db')
const userRoutes = require('./routes/users.routes')
const notesRoutes = require('./routes/notes.routes')
const googleRoutes = require('./routes/google.routes')
const cors = require('cors')
const passport = require('passport')
const app = express()
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const dotenv = require('dotenv') // Add the missing import statement for dotenv

dotenv.config()

db()
app.use(cookieParser())
app.use(
	cors({
		origin: 'https://note-nest-c.fly.dev',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: [
			'Content-Type',
			'Authorization',
			'Origin',
			'X-Requested-With',
			'Accept',
			'Set-Cookie',
			'Cookie',
			'Access-Control-Allow-Credentials',
			'Access-Control-Allow-Origin',
			'Access-Control-Allow-Headers',
			'Access-Control-Allow-Methods',
			'Access-Control-Request-Headers',
			'Access-Control-Request-Method',
		],
		credentials: true,
	})
)

app.set('trust proxy', true)

app.use(
	session({
		secret: 'tu secreto aquí',
		resave: true,
		saveUninitialized: false,
		name: 'sessionId',
		cookie: {
			httpOnly: true,
			sameSite: 'none', // Debe ser 'none' en minúsculas
			secure: true,
			maxAge: 90 * 24 * 60 * 60 * 1000,
		},
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URI, // Reemplaza esto con la URL de tu base de datos MongoDB
		}),
	})
)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.use('/api/users', userRoutes)
app.use('/api/google', googleRoutes)
app.use('/api/notes', notesRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port PORT ${PORT}`)
})
module.exports = app
