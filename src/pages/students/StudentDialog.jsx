import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { StudentForm } from "./StudentForm";


export function StudentDialog(props) {
	return (
		<Dialog open={props.open} onClose={props.onClose}>
			<DialogTitle fontWeight='bold'>Student</DialogTitle>
			<DialogContent>
				<StudentForm id="student-form" student={props.student} postSubmit={props.onClose} />
			</DialogContent>
			<DialogActions>
				<Button type="reset" form="student-form" color="secondary" variant="contained" onClick={props.onClose}>
					Cancel
				</Button>
				<Button type="submit" form="student-form" variant="contained" autoFocus>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
}

StudentDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	student: PropTypes.exact({
		id: PropTypes.string.isRequired,
		schoolId: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		gradeLevels: PropTypes.arrayOf(PropTypes.exact({
			grade: PropTypes.number.isRequired,
			class: PropTypes.string.isRequired,
			logDate: PropTypes.instanceOf(Date).isRequired
		}).isRequired).isRequired,
	})
};