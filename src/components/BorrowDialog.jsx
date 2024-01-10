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
			<DialogTitle>Borrow</DialogTitle>
			<DialogContent>
				<BorrowForm id="borrow-form" postSubmit={props.onClose} />
			</DialogContent>
			<DialogActions>
				<Button type="reset" color="secondary" form="borrow-form" onClick={props.onClose}>
					Cancel
				</Button>
				<Button type="submit" form="borrow-form">
					Done
				</Button>
				<Button form="borrow-form" autoFocus>
					Add new
				</Button>
			</DialogActions>
		</Dialog>
	);
}

BorrowDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};
