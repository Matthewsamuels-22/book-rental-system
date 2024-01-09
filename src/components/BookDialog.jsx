import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { BookForm } from "./BookForm";

export function BookDialog(props) {
	return (
		<Dialog open={props.open} onClose={props.onClose}>
			<DialogTitle>Book</DialogTitle>
			<DialogContent>
				<BookForm id="book-form" postSubmit={props.onClose} />
			</DialogContent>
			<DialogActions>
				<Button type="reset" color="secondary" form="book-form" onClick={props.onClose}>
					Cancel
				</Button>
				<Button type="submit" form="book-form" autoFocus>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
}

BookDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};
