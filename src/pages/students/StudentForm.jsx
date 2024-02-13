import PropTypes from "prop-types";
import { useContext, useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { StudentContext } from "../../contexts/StudentContext";
import { addStudent, updateStudent } from "../../helpers/firestore/students";
import { dateToIsoDateString } from "../../utilities/dateformat";
import { dateFromIsoDateString } from "../../utilities/dateparser";

function createGradeLevel() {
	return {
		uuid: window.crypto.randomUUID(),
		grade: 0,
		class: "",
		logDate: new Date(),
	};
}

export function StudentForm(props) {
	const { students, setStudents } = useContext(StudentContext);
	const [gradeLevels, setGradeLevels] = useState(
		props.student?.gradeLevels.map((x) => ({ uuid: window.crypto.randomUUID(), ...x })) ?? [
			createGradeLevel(),
		],
	);

	function addGradeLevel() {
		setGradeLevels([...gradeLevels, createGradeLevel()]);
	}

	function removeGradeLevel(levelIndex) {
		setGradeLevels(gradeLevels.filter((_, index) => index !== levelIndex));
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);

		const studentData = {
			name: formData.get("name"),
			schoolId: formData.get("id"),
			gradeLevels: gradeLevels.map((_, index) => ({
				grade: parseInt(formData.get("grade-" + index)),
				class: formData.get("class-" + index),
				logDate: dateFromIsoDateString(formData.get("log-date-" + index)),
			})),
		};

		if (props.student == null) {
			studentData.id = await addStudent(studentData);
			setStudents([...students, studentData]);
		} else {
			await updateStudent(props.student.id, studentData);
			studentData.id = props.student.id;
			const studentIndex = students.findIndex((x) => x.id === studentData.id);
			setStudents(students.toSpliced(studentIndex, 1, studentData));
		}

		props.postSubmit();
	}

	return (
		<Stack component="form" id={props.id} onSubmit={handleSubmit} spacing={2}>
			<TextField label="Name" name="name" defaultValue={props.student?.name} required />
			<TextField label="ID" name="id" defaultValue={props.student?.schoolId} required />
			<Stack component="fieldset" border="none" padding={0} spacing={2}>
				<Typography component="legend">Grade Levels</Typography>
				{gradeLevels.map((level, index) => (
					<Stack key={level.uuid} spacing={2}>
						<Stack direction="row" flexWrap="wrap" spacing={2} useFlexGap>
							<TextField
								type="number"
								label="Grade"
								name={"grade-" + index}
								defaultValue={level.grade}
								required
								inputProps={{ min: 0 }}
								sx={{ flexGrow: 1 }}
							/>
							<TextField
								label="Class"
								name={"class-" + index}
								defaultValue={level.class}
								required
								sx={{ flexGrow: 1 }}
							/>
						</Stack>
						<Stack direction="row" flexWrap="wrap" spacing={2} useFlexGap>
							<TextField
								type="date"
								label="Log date"
								name={"log-date-" + index}
								defaultValue={dateToIsoDateString(level.logDate)}
								required
								sx={{ flexGrow: 1 }}
							/>
							<Button
								color="error"
								onClick={() => removeGradeLevel(index)}
								disabled={gradeLevels.length === 1}
								sx={{ fontWeight: "bold", textTransform: "none" }}>
								Remove
							</Button>
						</Stack>
					</Stack>
				))}
				<Button onClick={addGradeLevel} sx={{ fontWeight: "bold", textTransform: "none" }}>
					Add grade level
				</Button>
			</Stack>
		</Stack>
	);
}

StudentForm.propTypes = {
	id: PropTypes.string.isRequired,
	postSubmit: PropTypes.func.isRequired,
	student: PropTypes.exact({
		id: PropTypes.string.isRequired,
		schoolId: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		gradeLevels: PropTypes.arrayOf(
			PropTypes.exact({
				grade: PropTypes.number.isRequired,
				class: PropTypes.string.isRequired,
				logDate: PropTypes.instanceOf(Date).isRequired,
			}).isRequired,
		).isRequired,
	}),
};
