import PropTypes from "prop-types";

import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export function InventoryTable(props) {
	function handleEntrySelect(event) {
		const checkbox = event.target;
		const entryId = checkbox.dataset.id;

		if (checkbox.checked) {
			props.setInventorySelection([...props.inventorySelection, entryId]);
			return;
		}

		props.setInventorySelection(props.inventorySelection.filter((x) => x !== entryId));
	}

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell>Book</TableCell>
						<TableCell>Quantity</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.inventory.map((entry, index) => (
						<TableRow key={index}>
							<TableCell>
								<Checkbox
									onChange={handleEntrySelect}
									disabled={props.inventorySelection.length > 10}
									inputProps={{ "data-id": entry.id }}
								/>
							</TableCell>
							<TableCell>{entry.book}</TableCell>
							<TableCell>{entry.quantity}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

InventoryTable.propTypes = {
	inventorySelection: PropTypes.arrayOf(PropTypes.string).isRequired,
	setInventorySelection: PropTypes.func.isRequired,
	inventory: PropTypes.arrayOf(
		PropTypes.exact({
			id: PropTypes.string.isRequired,
			book: PropTypes.string.isRequired,
			quantity: PropTypes.number.isRequired,
		}).isRequired
	).isRequired
};