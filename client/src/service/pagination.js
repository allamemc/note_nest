export function pagination({ onChange, page, count }) {
	const handlePrevious = () => {
		if (page > 1) {
			onChange(page - 1)
		}
	}

	const handleNext = () => {
		if (page < count) {
			onChange(page + 1)
		}
	}

	return { handlePrevious, handleNext }
}
