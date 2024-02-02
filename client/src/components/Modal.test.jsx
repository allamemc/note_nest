import { render, screen, fireEvent } from '@testing-library/react'
import { test, expect } from 'vitest'
import Modal from './Modal'
import { beforeEach } from 'vitest'

beforeEach(() => {
	render(<Modal />)
})
test('renders Modal con el texto salir', () => {
	expect(screen.getByText(/Salir/i)).toBeDefined()
})

test('renders Modal con un título', () => {
	expect(screen.getByText(/Cerrar Sesion/i)).toBeDefined()
})

test('renders Modal con un mensaje de confirmación', () => {
	expect(
		screen.getByText(/¿Estás seguro de que quieres cerrar la/i)
	).toBeDefined()
})
