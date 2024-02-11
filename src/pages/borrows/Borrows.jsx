import { Fragment, useContext, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { BorrowDialog } from "./BorrowDialog";
import { BorrowTable } from "./BorrowTable";
import { BorrowContext } from "../../contexts/BorrowContext";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { deleteBorrowEntry, getBorrowEntries } from "../../helpers/firestore/borrows";

export function Borrows() {
	const { borrows, setBorrows } = useContext(BorrowContext);

	const [open, setOpen] = useState(false);
	const [selectedBorrowEntries, setSelectedBorrowEntries] = useState([])
	const [selectedBorrowEntry, setSelectedBorrowEntry] = useState(null)

	useEffect(() => {
		if (borrows.length === 0) {
			getBorrowEntries()
				.then(x => setBorrows(x))
				.catch(console.error);
		}
	}, []);

	useDocumentTitle("Borrows");

	function handleAdd() {
		setSelectedBorrowEntry(null)
		setOpen(true)
	}

	function handleEdit() {
		const entryId = selectedBorrowEntries[0]
		const entry = borrows.find(x => x.id === entryId);
		setSelectedBorrowEntry(entry)
		setOpen(true)
	}

	async function handleDelete() {
		for (const id of selectedBorrowEntries) await deleteBorrowEntry(id);

		setBorrows(borrows.filter(x => !selectedBorrowEntries.includes(x.id)))
		setSelectedBorrowEntries([])
	}

	return (
		<Fragment>
			<Stack direction='row'>
				<Button variant="contained" onClick={handleAdd}>
					Add
				</Button>
				<Button color="secondary" onClick={handleEdit} disabled={selectedBorrowEntries.length !== 1}>Edit</Button>
				<Button color="error" onClick={handleDelete} disabled={selectedBorrowEntries.length === 0}>Delete</Button>
				<TextField type="search" placeholder="Search" />
			</Stack>

			<BorrowTable records={borrows} selectedRecords={selectedBorrowEntries} setSelectedRecords={setSelectedBorrowEntries} />
			<BorrowDialog open={open} onClose={() => setOpen(false)} borrowEntry={selectedBorrowEntry} />
		</Fragment>
	);
}
