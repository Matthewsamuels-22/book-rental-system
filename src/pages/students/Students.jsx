import { Fragment, useContext, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { StudentTable } from "./StudentTable";
import { StudentDialog } from "./StudentDialog";
import { StudentContext } from "../../contexts/StudentContext";
import { deleteStudent, getStudents } from "../../helpers/firestore/students";

export function Students() {
	const { students, setStudents } = useContext(StudentContext);

	const [open, setOpen] = useState(false);
	const [studentSelection, setStudentSelection] = useState([]);
	const [studentSelected, setStudentSelected] = useState(null);

	useEffect(() => {
		if (students.length !== 0) return;

		getStudents()
			.then((x) => setStudents(x))
			.catch(console.error);
	}, []);

	function handleAdd() {
		setStudentSelected(null);
		setOpen(true);
	}

	function handleEdit() {
		const studentId = studentSelection[0];
		const student = students.find((x) => x.id === studentId);
		setStudentSelected(student);
		setOpen(true);
	}

	async function handleDelete() {
		for (const id of studentSelection) await deleteStudent(id);

		setStudents(students.filter((x) => !studentSelection.includes(x.id)));
		setStudentSelection([]);
	}

	function handleSearch(event) {

	}

	return (
		<Fragment>
			<Stack direction='row'>
				<Button variant="contained" onClick={handleAdd}>Add</Button>
				<Button color="secondary" onClick={handleEdit} disabled={studentSelection.length !== 1}>Edit</Button>
				<Button color="error" onClick={handleDelete} disabled={studentSelection.length === 0}>Delete</Button>
				<TextField type="search" placeholder="Search" onChange={(e) => console.log(e.target.value)} />
			</Stack>

			<StudentTable students={students} studentSelection={studentSelection} setStudentSelection={setStudentSelection} />
			<StudentDialog open={open} onClose={() => setOpen(false)} student={studentSelected} />
		</Fragment>
	)
}