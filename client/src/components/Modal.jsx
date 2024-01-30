export default function Modal({ handleSubmit, loader }) {
	return (
		<dialog id='my_modal_1' className='modal'>
			<div className='modal-box'>
				<form method='dialog'>
					<button className='absolute btn btn-sm btn-circle btn-ghost right-2 top-2'>
						✕
					</button>
				</form>
				<h3 className='text-lg font-bold'>Cerrar Sesión</h3>
				<p className='py-4'>
					¿Estás seguro de que quieres cerrar la{' '}
					<span className='font-bold'>sesión</span>?
				</p>
				<div className='modal-action'>
					<form onSubmit={handleSubmit}>
						<button className='btn bg-base-200' type='submit'>
							{loader ? (
								<span className='loading loading-spinner loading-sm'></span>
							) : (
								'Salir'
							)}
						</button>
					</form>
				</div>
			</div>
		</dialog>
	)
}
