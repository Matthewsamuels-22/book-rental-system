import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { BorrowForm } from "./BorrowForm";

export function BorrowDialog(props) {
	return (
		<Dialog open={props.open} onClose={props.onClose}>
			<DialogTitle fontWeight="bold">Borrow</DialogTitle>
			<DialogContent>
				<BorrowForm
					id="borrow-form"
					borrowEntry={props.borrowEntry}
					postSubmit={props.onClose}
				/>
			</DialogContent>
			<DialogActions>
				<Button type="reset" form="borrow-form" color="secondary" onClick={props.onClose}>
					Cancel
				</Button>
				<Button type="submit" form="borrow-form" autoFocus>
					{props.borrowEntry == null ? "Add" : "Edit"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

BorrowDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	borrowEntry: PropTypes.exact({
		id: PropTypes.string.isRequired,
		borrower: PropTypes.string.isRequired,
		book: PropTypes.string.isRequired,
		dateBorrowed: PropTypes.instanceOf(Date).isRequired,
		dateReturned: PropTypes.instanceOf(Date),
		conditionBorrowed: PropTypes.string.isRequired,
		conditionReturned: PropTypes.string,
	}),
};
