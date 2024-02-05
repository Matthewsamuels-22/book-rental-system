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
			<DialogTitle fontWeight='bold'>Book</DialogTitle>
			<DialogContent>
				<BookForm id="book-form" book={props.book} postSubmit={props.onClose} />
			</DialogContent>
			<DialogActions>
				<Button type="reset" form="book-form" color="secondary" onClick={props.onClose}>
					Cancel
				</Button>
				<Button type="submit" form="book-form" autoFocus>
					{props.book == null ? "Add" : "Edit"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

BookDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	book: PropTypes.exact({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		authors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
		edition: PropTypes.number.isRequired,
		volume: PropTypes.number.isRequired,
		publisher: PropTypes.string.isRequired,
		yearPublished: PropTypes.number.isRequired,
	}),
};
