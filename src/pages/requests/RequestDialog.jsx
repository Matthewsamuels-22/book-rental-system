import { PropTypes } from "prop-types";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { RequestForm } from "./RequestForm";

export function RequestDialog(props) {
	return (
		<Dialog open={props.open} onClose={props.onClose}>
			<DialogTitle fontWeight='bold'>Request</DialogTitle>
			<DialogContent>
				<RequestForm id="request-form" postSubmit={props.onClose} />
			</DialogContent>
			<DialogActions>
				<Button type="reset" form="request-form" color="secondary" onClick={props.onClose}>
					Cancel
				</Button>
				<Button type="submit" form="request-form" autoFocus>
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	);
}

RequestDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};
