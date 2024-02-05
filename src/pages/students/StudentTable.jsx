import PropTypes from "prop-types";

import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { dateToIsoDateString } from "../../utilities/dateformat";

export function StudentTable(props) {
	function handleStudentSelect(event) {
		const checkbox = event.target;
		const studentId = checkbox.dataset.id;

		if (checkbox.checked) {
			props.setStudentSelection([...props.studentSelection, studentId]);
			return;
		}

		props.setStudentSelection(props.studentSelection.filter((x) => x !== studentId));
	}

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell>ID</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Grade</TableCell>
						<TableCell>Class</TableCell>
						<TableCell>Date Log</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.students.map((student, index) => (
						<TableRow key={index}>
							<TableCell>
								<Checkbox
									onChange={handleStudentSelect}
									disabled={props.studentSelection.length > 10}
									inputProps={{ "data-id": student.id }}
								/>
							</TableCell>
							<TableCell>{student.schoolId}</TableCell>
							<TableCell>{student.name}</TableCell>
							<TableCell>{student.gradeLevels.at(-1).grade}</TableCell>
							<TableCell>{student.gradeLevels.at(-1).class}</TableCell>
							<TableCell>{dateToIsoDateString(student.gradeLevels.at(-1).logDate)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}


StudentTable.propTypes = {
	studentSelection: PropTypes.arrayOf(PropTypes.string).isRequired,
	setStudentSelection: PropTypes.func.isRequired,
	students: PropTypes.arrayOf(
		PropTypes.exact({
			id: PropTypes.string.isRequired,
			schoolId: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			gradeLevels: PropTypes.arrayOf(PropTypes.exact({
				grade: PropTypes.number.isRequired,
				class: PropTypes.string.isRequired,
				logDate: PropTypes.instanceOf(Date).isRequired
			}).isRequired).isRequired,
		}).isRequired
	).isRequired
};