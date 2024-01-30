function Note({ note, onClose }) {
	return (
		<div className='note-overlay'>
			<div className='note-content'>
				<h2>{note.title}</h2>
				<p>{note.content}</p>
				<button className='btn bg-base-100' onClick={onClose}>
					Cerrar
				</button>
			</div>
		</div>
	)
}

export default Note
