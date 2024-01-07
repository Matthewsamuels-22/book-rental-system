/**
 * Get local date from ISO date string.
 *
 * @param {string} text Date string in the format `YYYY-MM-DD`
 * @returns `null` if text is an empty string
 */
export function dateFromIsoDateString(text) {
	if (text.length > 0) {
		return new Date(text + 'T00:00')
	}

	return null
}