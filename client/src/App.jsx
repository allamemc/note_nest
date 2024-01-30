import { Suspense, useContext, lazy } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom'
import { UserContext } from './context/UserContext'
import { motion } from 'framer-motion'

// Importa los componentes de forma diferida
const Login = lazy(() => import('./components/Login'))
const Dashboard = lazy(() => import('./components/Dashboard'))

function LoadingComponent() {
	return (
		<motion.div>
			<p>Cargando...</p>
		</motion.div>
	)
}

export default function App() {
	const { user } = useContext(UserContext)

	return (
		<>
			<Router>
				<Suspense fallback={<LoadingComponent />}>
					<Routes>
						<Route
							exact
							path='/'
							element={user ? <Navigate to='/dashboard' /> : <Login />}
						/>
						<Route
							exact
							path='/dashboard'
							element={user ? <Dashboard /> : <Navigate to='/' />}
						/>
					</Routes>
				</Suspense>
			</Router>
		</>
	)
}
