import { Fragment, useContext, useEffect } from "react";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { BookTable } from "../components/BookTable";
import { getBooks } from "../helpers/firestore/books";
import { BookContext } from "../contexts/BookContext";

export function Books() {
	const { books, setBooks } = useContext(BookContext);

	useEffect(() => {
		if (books.length !== 0) return;

		getBooks()
			.then((x) => setBooks(x))
			.catch(console.error);
	}, []);

	return (
		<Fragment>
			<Stack direction='row'>
				<TextField type="search" placeholder="Search" />
			</Stack>

			<BookTable books={books} />
		</Fragment>
	);
}
