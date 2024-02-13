import { Fragment, useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { BookContext } from "../../contexts/BookContext";
import { getBooks } from "../../helpers/firestore/books";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { BookTable } from "./BookTable";

export function Books() {
	const { books, setBooks } = useContext(BookContext);
	const [selectedBooks, setSelectedBooks] = useState([]);

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
				records={books}
				selectedRecords={selectedBooks}
				setSelectedRecords={setSelectedBooks}
			/>
		</Fragment>
	);
}
