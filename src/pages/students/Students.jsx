import { Fragment, useContext, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { StudentContext } from "../../contexts/StudentContext";
import { deleteStudent, getStudents } from "../../helpers/firestore/students";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { StudentDialog } from "./StudentDialog";
import { StudentTable } from "./StudentTable";

export function Students() {
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
		for (const id of selectedStudents) await deleteStudent(id);

		setStudents(students.filter((x) => !selectedStudents.includes(x.id)));
		setSelectedStudents([]);
	}

	function handleSearch(event) {}

	return (
		<Fragment>
			<Stack direction="row">
				<Button variant="contained" onClick={handleAdd}>
					Add
				</Button>
				<Button
					color="secondary"
					onClick={handleEdit}
					disabled={selectedStudents.length !== 1}>
					Edit
				</Button>
				<Button
					color="error"
					onClick={handleDelete}
					disabled={selectedStudents.length === 0}>
					Delete
				</Button>
				<TextField
					type="search"
					placeholder="Search"
					onChange={(e) => console.log(e.target.value)}
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
