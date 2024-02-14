import { Fragment, useContext, useEffect, useState } from "react";
import { FaPen, FaPlus, FaSearch, FaTrash } from "react-icons/fa";

import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { BorrowContext } from "../../contexts/BorrowContext";
import { StudentContext } from "../../contexts/StudentContext";
import { getBorrowEntries } from "../../helpers/firestore/borrows";
import { deleteEverythingForStudent, getStudents } from "../../helpers/firestore/students";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { StudentDialog } from "./StudentDialog";
import { StudentTable } from "./StudentTable";

export function Students() {
	const { borrows, setBorrows } = useContext(BorrowContext);
	const { students, setStudents } = useContext(StudentContext);

	const [open, setOpen] = useState(false);
	const [selectedStudents, setSelectedStudents] = useState([]);
	const [studentSelected, setStudentSelected] = useState(null);

	useEffect(() => {
		if (students.length !== 0) return;

		getStudents()
			.then((x) => setStudents(x))
			.catch(console.error);
	}, []);

	useDocumentTitle("Students");

	function handleAdd() {
		setStudentSelected(null);
		setOpen(true);
	}

	function handleEdit() {
		const studentId = selectedStudents[0];
		const student = students.find((x) => x.id === studentId);
		setStudentSelected(student);
		setOpen(true);
	}

	async function handleDelete() {
		const initialBorrows = borrows.length === 0 ? await getBorrowEntries() : borrows;
		const preservedBorrows = initialBorrows.filter(
			(x) => !selectedStudents.includes(x.borrower),
		);
		const discardedBorrows = initialBorrows.filter((x) =>
			selectedStudents.includes(x.borrower),
		);

		for (const id of selectedStudents) await deleteEverythingForStudent(id, discardedBorrows);

		setStudents(students.filter((x) => !selectedStudents.includes(x.id)));
		setSelectedStudents([]);
		setBorrows(preservedBorrows);
	}

	function handleSearch(event) {}

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
					disabled={selectedStudents.length !== 1}
					startIcon={<FaPen />}
					sx={{ fontWeight: "bold", textTransform: "none" }}>
					Edit
				</Button>
				<Button
					color="error"
					onClick={handleDelete}
					disabled={selectedStudents.length === 0}
					startIcon={<FaTrash />}
					sx={{ fontWeight: "bold", textTransform: "none" }}>
					Delete
				</Button>
				<TextField
					type="search"
					placeholder="Search"
					size="small"
					onChange={(e) => console.log(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<FaSearch />
							</InputAdornment>
						),
					}}
				/>
			</Stack>

			<StudentTable
				records={students}
				selectedRecords={selectedStudents}
				setSelectedRecords={setSelectedStudents}
			/>
			<StudentDialog open={open} onClose={() => setOpen(false)} student={studentSelected} />
		</Fragment>
	);
}
