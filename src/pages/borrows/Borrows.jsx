import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { FaPen, FaPlus, FaSearch, FaTrash } from "react-icons/fa";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { BookContext } from "../../contexts/BookContext";
import { BorrowContext } from "../../contexts/BorrowContext";
import { StudentContext } from "../../contexts/StudentContext";
import { getBooks } from "../../helpers/firestore/books";
import { deleteBorrowEntry, getBorrowEntries } from "../../helpers/firestore/borrows";
import { getStudents } from "../../helpers/firestore/students";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useSearchField } from "../../hooks/useSearchField";
import { BorrowDialog } from "./BorrowDialog";
import { BorrowTable } from "./BorrowTable";

export function Borrows() {
	const { books, setBooks } = useContext(BookContext);
	const { borrows, setBorrows } = useContext(BorrowContext);
	const { students, setStudents } = useContext(StudentContext);

	const [open, setOpen] = useState(false);
	const [dataIsLoaded, setDataIsLoaded] = useState(false);
	const [selectedBorrowEntries, setSelectedBorrowEntries] = useState([]);
	const [selectedBorrowEntry, setSelectedBorrowEntry] = useState(null);

	const {
		searchResults: rawSearchResults,
		emptySearchResults,
		handleSearch,
	} = useSearchField((query) => {
		const bookResults = books.filter((x) => x.title.toLowerCase().includes(query));
		const studentResults = students.filter((x) => x.name.toLowerCase().includes(query));
		return borrows.filter(
			(x) =>
				bookResults.some((y) => y.id === x.book) ||
				studentResults.some((y) => y.id === x.borrower),
		);
	});

	const searchResults = useMemo(
		() => borrows.filter((x) => rawSearchResults.some((y) => y.id === x.id)),
		[rawSearchResults, books, borrows, students],
	);

	useEffect(() => {
		const dataRequests = [];

		if (borrows.length === 0) {
			const borrowsRequest = getBorrowEntries().then((x) => setBorrows(x));
			dataRequests.push(borrowsRequest);
		}

		if (books.length === 0) {
			const booksRequest = getBooks().then((x) => setBooks(x));
			dataRequests.push(booksRequest);
		}

		if (students.length === 0) {
			const studentsRequest = getStudents().then((x) => setStudents(x));
			dataRequests.push(studentsRequest);
		}

		Promise.all(dataRequests).then(() => setDataIsLoaded(true));
	}, []);

	useDocumentTitle("Borrows");

	function handleAdd() {
		setSelectedBorrowEntry(null);
		setOpen(true);
	}

	function handleEdit() {
		const entryId = selectedBorrowEntries[0];
		const entry = borrows.find((x) => x.id === entryId);
		setSelectedBorrowEntry(entry);
		setOpen(true);
	}

	async function handleDelete() {
		for (const id of selectedBorrowEntries) await deleteBorrowEntry(id);

		setBorrows(borrows.filter((x) => !selectedBorrowEntries.includes(x.id)));
		setSelectedBorrowEntries([]);
	}

	if (!dataIsLoaded) {
		return <Box>Loading...</Box>;
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
					disabled={selectedBorrowEntries.length !== 1}
					startIcon={<FaPen />}
					sx={{ fontWeight: "bold", textTransform: "none" }}>
					Edit
				</Button>
				<Button
					color="error"
					onClick={handleDelete}
					disabled={selectedBorrowEntries.length === 0}
					startIcon={<FaTrash />}
					sx={{ fontWeight: "bold", textTransform: "none" }}>
					Delete
				</Button>
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

			<BorrowTable
				records={!emptySearchResults ? searchResults : borrows}
				selectedRecords={selectedBorrowEntries}
				setSelectedRecords={setSelectedBorrowEntries}
				students={students}
				books={books}
			/>
			<BorrowDialog
				open={open}
				onClose={() => setOpen(false)}
				borrowEntry={selectedBorrowEntry}
			/>
		</Fragment>
	);
}
