import PropTypes from "prop-types";

import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export function InventoryTable(props) {
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
						<TableCell>Book</TableCell>
						<TableCell>Quantity</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.records.map((entry) => (
						<TableRow key={entry.id}>
							<TableCell>
								<Checkbox
									onChange={handleRecordSelect}
									disabled={props.selectedRecords.length > 10}
									inputProps={{ "data-id": entry.id }}
								/>
							</TableCell>
							<TableCell>
								{props.books.find((x) => x.id === entry.book).title}
							</TableCell>
							<TableCell>{entry.quantity}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

InventoryTable.propTypes = {
	selectedRecords: PropTypes.arrayOf(PropTypes.string).isRequired,
	setSelectedRecords: PropTypes.func.isRequired,
	records: PropTypes.arrayOf(
		PropTypes.exact({
			id: PropTypes.string.isRequired,
			book: PropTypes.string.isRequired,
			quantity: PropTypes.number.isRequired,
		}).isRequired,
	).isRequired,
	books: PropTypes.arrayOf(
		PropTypes.exact({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			authors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
			edition: PropTypes.number.isRequired,
			volume: PropTypes.number.isRequired,
			publisher: PropTypes.string.isRequired,
			yearPublished: PropTypes.number.isRequired,
		}).isRequired,
	).isRequired,
};
