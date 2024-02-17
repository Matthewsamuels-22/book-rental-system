import { useState } from "react";

/**
 * @param {(query: string) => unknown} callbackfn
 */
export function useSearchField(callbackfn) {
	const [emptySearchResults, setEmptySearchResults] = useState(true);
	const [searchResults, setSearchResults] = useState([]);

	const handleSearch = (event) => {
		const value = event.target.value;

		if (value.length === 0) {
			setSearchResults([]);
			setEmptySearchResults(true);
			return;
		}

		if (event.key !== "Enter") return;

		const query = value.toLowerCase();
		const results = callbackfn(query);

		setSearchResults(results);
		setEmptySearchResults(false);
	};

	return { emptySearchResults, searchResults, handleSearch };
}
