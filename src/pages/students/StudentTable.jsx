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
	function handleRecordSelect(event) {
		const checkbox = event.target;
		const recordId = checkbox.dataset.id;

		if (checkbox.checked) {
			props.setSelectedRecords([...props.selectedRecords, recordId]);
			return;
		}

		props.setSelectedRecords(props.selectedRecords.filter((x) => x !== recordId));
	}

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell>ID</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Grade</TableCell>
						<TableCell>Class</TableCell>
						<TableCell>Date Log</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.records.map((student) => (
						<TableRow key={student.id}>
							<TableCell>
								<Checkbox
									onChange={handleRecordSelect}
									disabled={props.selectedRecords.length > 10}
									inputProps={{ "data-id": student.id }}
								/>
							</TableCell>
							<TableCell>{student.schoolId}</TableCell>
							<TableCell>{student.name}</TableCell>
							<TableCell>{student.gradeLevels.at(-1).grade}</TableCell>
							<TableCell>{student.gradeLevels.at(-1).class}</TableCell>
							<TableCell>
								{dateToIsoDateString(student.gradeLevels.at(-1).logDate)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

StudentTable.propTypes = {
	selectedRecords: PropTypes.arrayOf(PropTypes.string).isRequired,
	setSelectedRecords: PropTypes.func.isRequired,
	records: PropTypes.arrayOf(
		PropTypes.exact({
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
		}).isRequired,
	).isRequired,
};
