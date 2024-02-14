import { Fragment, useContext, useEffect, useState } from "react";
import { FaPen, FaPlus, FaSearch, FaTrash } from "react-icons/fa";

import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { BookContext } from "../../../contexts/BookContext";
import { RequestContext } from "../../../contexts/RequestContext";
import { deleteEverythingForBook, getBooks } from "../../../helpers/firestore/books";
import { getBookRequests } from "../../../helpers/firestore/requests";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { BookDialog } from "./BookDialog";
import { BookTable } from "./BookTable";

export function Books() {
	const { books, setBooks } = useContext(BookContext);
	const { requests, setRequests } = useContext(RequestContext);

	const [open, setOpen] = useState(false);
	const [selectedBooks, setSelectedBooks] = useState([]);
	const [bookSelected, setBookSelected] = useState(null);

	useEffect(() => {
		if (books.length !== 0) return;

		getBooks()
			.then((x) => setBooks(x))
			.catch(console.error);
	}, []);

	useDocumentTitle("Books");

	function handleAdd() {
		setBookSelected(null);
		setOpen(true);
	}

	function handleEdit() {
		const bookId = selectedBooks[0];
		const book = books.find((x) => x.id === bookId);
		setBookSelected(book);
		setOpen(true);
	}

	async function handleDelete() {
		const initialRequests = requests.length === 0 ? await getBookRequests() : requests;
		const preservedRequests = initialRequests.filter((x) => !selectedBooks.includes(x.book));
		const discardedRequests = initialRequests.filter((x) => selectedBooks.includes(x.book));

		for (const id of selectedBooks) await deleteEverythingForBook(id, discardedRequests);

		setBooks(books.filter((x) => !selectedBooks.includes(x.id)));
		setSelectedBooks([]);
		setRequests(preservedRequests);
	}

	return (
		<Fragment>
			<Stack direction="row" spacing={2}>
				<Button
					variant="contained"
					onClick={handleAdd}
					startIcon={<FaPlus />}
					sx={{ fontWeight: "bold", textTransform: "none" }}>
					Add
				</Button>
				<Button
					color="secondary"
					onClick={handleEdit}
					disabled={selectedBooks.length !== 1}
					startIcon={<FaPen />}
					sx={{ fontWeight: "bold", textTransform: "none" }}>
					Edit
				</Button>
				<Button
					color="error"
					onClick={handleDelete}
					disabled={selectedBooks.length === 0}
					startIcon={<FaTrash />}
					sx={{ fontWeight: "bold", textTransform: "none" }}>
					Delete
				</Button>
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
			<BookDialog open={open} onClose={() => setOpen(false)} book={bookSelected} />
		</Fragment>
	);
}
