import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { InventoryForm } from "./InventoryForm";

export function InventoryDialog(props) {
	return (
		<Dialog open={props.open} onClose={props.onClose} fullWidth>
			<DialogTitle fontWeight="bold">Inventory</DialogTitle>
			<DialogContent>
				<InventoryForm
					id="inventory-form"
					inventory={props.inventory}
					postSubmit={props.onClose}
				/>
			</DialogContent>
			<DialogActions>
				<Button
					type="reset"
					form="inventory-form"
					color="secondary"
					onClick={props.onClose}
					sx={{ fontWeight: "bold" }}>
					Cancel
				</Button>
				<Button
					type="submit"
					form="inventory-form"
					variant="contained"
					sx={{ fontWeight: "bold" }}
					autoFocus>
					{props.inventory == null ? "Add" : "Edit"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

InventoryDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	inventory: PropTypes.exact({
		id: PropTypes.string.isRequired,
		book: PropTypes.string.isRequired,
		quantity: PropTypes.number.isRequired,
	}),
};
