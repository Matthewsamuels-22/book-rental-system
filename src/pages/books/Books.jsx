import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";

import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { BookContext } from "../../contexts/BookContext";
import { getBooks } from "../../helpers/firestore/books";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useSearchField } from "../../hooks/useSearchField";
import { BookTable } from "./BookTable";

export function Books() {
	const { books, setBooks } = useContext(BookContext);
	const [selectedBooks, setSelectedBooks] = useState([]);

	const {
		searchResults: rawSearchResults,
		emptySearchResults,
		handleSearch,
	} = useSearchField((query) =>
		books.filter(
			(x) =>
				x.title.toLowerCase().includes(query) ||
				x.publisher.toLowerCase().includes(query) ||
				x.authors.some((a) => a.toLowerCase().includes(query)),
		),
	);

	const searchResults = useMemo(
		() => books.filter((x) => rawSearchResults.some((y) => y.id === x.id)),
		[rawSearchResults, books],
	);

	useEffect(() => {
		if (books.length !== 0) return;

		getBooks()
			.then((x) => setBooks(x))
			.catch(console.error);
	}, []);

	useDocumentTitle("Books");

	return (
		<Fragment>
			<Stack direction="row">
				<TextField
					type="search"
					placeholder="Search"
					size="small"
					onChange={handleSearch}
					onKeyDown={handleSearch}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<FaSearch />
							</InputAdornment>
						),
					}}
				/>
			</Stack>

			<BookTable
				records={!emptySearchResults ? searchResults : books}
				selectedRecords={selectedBooks}
				setSelectedRecords={setSelectedBooks}
			/>
		</Fragment>
	);
}
