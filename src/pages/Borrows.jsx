import { Fragment, useContext, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { BorrowDialog } from "../components/BorrowDialog";
import { BorrowTable } from "../components/BorrowTable";
import { BookContext } from "../contexts/BookContext";
import { getBooks } from "../helpers/firestore/books";
import { BorrowContext } from "../contexts/BorrowContext";

export function Borrows() {
	const { books, setBooks } = useContext(BookContext);
	const { borrows } = useContext(BorrowContext);

	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (books.length === 0) {
			getBooks()
				.then((x) => setBooks(x))
				.catch(console.error);
		}

		if (borrows.length === 0) {
			// fetch borrows
		}
	}, []);

	return (
		<Fragment>
			<Stack direction='row'>
				<Button variant="contained" onClick={() => setOpen(true)}>
					Add
				</Button>
				<Button color="secondary">Edit</Button>
				<Button color="error">Delete</Button>
				<TextField type="search" placeholder="Search" />
			</Stack>

			<BorrowTable borrows={borrows} />
			<BorrowDialog open={open} onClose={() => setOpen(false)} />
		</Fragment>
	);
}
