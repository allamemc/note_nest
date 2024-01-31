export default function ModalDelete({ handleSubmit, loader }) {
	return (
		<>
			<dialog id='my_modal_1' className='modal'>
				<div className='modal-box'>
					<form method='dialog'>
						<button className='absolute btn btn-sm btn-circle btn-ghost right-2 top-2'>
							✕
						</button>
					</form>
					<h3 className='text-lg font-bold'>Borrar Nota</h3>
					<p className='py-4'>
						¿Estás seguro de que quieres borrar esta{' '}
						<span className='font-bold'>nota</span>?
					</p>
					<div className='modal-action'>
						<form onSubmit={handleSubmit}>
							<button className='btn bg-base-200' type='submit'>
								{loader ? (
									<span className='loading loading-spinner loading-sm'></span>
								) : (
									'Eliminar'
								)}
							</button>
						</form>
					</div>
				</div>
			</dialog>
			<dialog id='my_modal_2' className='modal'>
				<div className='modal-box'>
					<form method='dialog'>
						<button className='absolute btn btn-sm btn-circle btn-ghost right-2 top-2'>
							✕
						</button>
					</form>
					<h3 className='text-lg font-bold'>Comienza a escribir</h3>
					<p className='py-4'>
						Si quieres borrar esta <span className='font-bold'>nota</span>,
						primero debes <span className='font-bold'>guardarla</span>.
					</p>
					<div className='modal-action'>
						<form onSubmit={handleSubmit}></form>
					</div>
				</div>
			</dialog>
		</>
	)
}
