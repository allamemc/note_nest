import { pagination } from '../service/pagination'
const Pagination = ({ count, page, onChange }) => {
	const { handlePrevious, handleNext } = pagination({ count, page, onChange })
	return (
		<div className='flex gap-7'>
			<button
				className='border-0 shadow-xl btn btn-circle bg-base-300 hover:bg-base-200'
				onClick={handlePrevious}
				disabled={page === 1}>
				<ion-icon name='caret-back'></ion-icon>
			</button>
			<button
				className='border-0 shadow-xl btn btn-circle bg-base-300 hover:bg-base-200'
				onClick={handleNext}
				disabled={page === count}>
				<ion-icon name='caret-forward'></ion-icon>
			</button>
		</div>
	)
}

export default Pagination
