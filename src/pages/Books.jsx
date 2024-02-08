import { Fragment, useContext, useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { BookTable } from "../components/BookTable";
import { getBooks } from "../helpers/firestore/books";
import { BookContext } from "../contexts/BookContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function Books() {
	const { books, setBooks } = useContext(BookContext);
	const [selectedBooks, setSelectedBooks] = useState([])

	useEffect(() => {
		if (books.length !== 0) return;

		getBooks()
			.then((x) => setBooks(x))
			.catch(console.error);
	}, []);

	useDocumentTitle("Books");

	return (
		<Fragment>
			<Stack direction='row'>
				<TextField type="search" placeholder="Search" />
			</Stack>

			<BookTable records={books} selectedRecords={selectedBooks} setSelectedRecords={setSelectedBooks} />
		</Fragment>
	);
}
