import { Fragment, useContext, useEffect, useState } from "react";
import { FaPlus, FaPen, FaTrash } from "react-icons/fa";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { BookContext } from "../../../contexts/BookContext";
import { BookDialog } from "../../../components/BookDialog";
import { deleteBook, getBooks } from "../../../helpers/firestore/books";
import { BookTable } from "./BookTable";

export function Books() {
	const { books, setBooks } = useContext(BookContext);

	const [open, setOpen] = useState(false);
	const [bookSelection, setBookSelection] = useState([]);
	const [bookSelected, setBookSelected] = useState(null);

	useEffect(() => {
		if (books.length !== 0) return;

		getBooks()
			.then((x) => setBooks(x))
			.catch(console.error);
	}, []);

	function handleAdd() {
		setBookSelected(null);
		setOpen(true);
	}

	function handleEdit() {
		const bookId = bookSelection[0];
		const book = books.find((x) => x.id === bookId);
		setBookSelected(book);
		setOpen(true);
	}

	async function handleDelete() {
		for (const id of bookSelection) await deleteBook(id);

		setBooks(books.filter((x) => !bookSelection.includes(x.id)));
		setBookSelection([]);
	}

	return (
		<Fragment>
			<Stack direction="row">
				<Button onClick={handleAdd} startIcon={<FaPlus />}>
					Add
				</Button>
				<Button
					onClick={handleEdit}
					disabled={bookSelection.length !== 1}
					startIcon={<FaPen />}>
					Edit
				</Button>
				<Button
					color="error"
					onClick={handleDelete}
					disabled={bookSelection.length === 0}
					startIcon={<FaTrash />}>
					Delete
				</Button>
				<TextField type="search" />
			</Stack>

			<BookTable bookSelection={bookSelection} setBookSelection={setBookSelection} />
			<BookDialog open={open} onClose={() => setOpen(false)} book={bookSelected} />
		</Fragment>
	);
}
