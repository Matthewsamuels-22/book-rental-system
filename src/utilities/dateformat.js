/**
 * @param {Date} date
 * @returns Local date and time string in the format `YYYY-MM-DDThh:mm`
 */
export function dateToIsoString(date) {
	return date
		?.toLocaleString('sv-SE', {
			dateStyle: 'short',
			timeStyle: 'short',
		})
		.replace(' ', 'T');
}

/**
 * @param {Date} date
 * @returns Local date string in the format `YYYY-MM-DD`
 */
export function dateToIsoDateString(date) {
	return date?.toLocaleDateString('sv-SE', { dateStyle: 'short' });
}