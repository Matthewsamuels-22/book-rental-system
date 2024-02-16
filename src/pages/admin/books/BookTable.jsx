import PropTypes from "prop-types";

import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export function BookTable(props) {
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
						<TableCell>Title</TableCell>
						<TableCell>Authors</TableCell>
						<TableCell>Edition</TableCell>
						<TableCell>Volume</TableCell>
						<TableCell>Publisher</TableCell>
						<TableCell>Year Published</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.records.map((book) => (
						<TableRow key={book.id}>
							<TableCell>
								<Checkbox
									onChange={handleRecordSelect}
									disabled={props.selectedRecords.length > 10}
									inputProps={{ "data-id": book.id }}
								/>
							</TableCell>
							<TableCell>{book.title}</TableCell>
							<TableCell>{book.authors.join(", ")}</TableCell>
							<TableCell>{book.edition}</TableCell>
							<TableCell>{book.volume}</TableCell>
							<TableCell>{book.publisher}</TableCell>
							<TableCell>{book.yearPublished}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

BookTable.propTypes = {
	selectedRecords: PropTypes.arrayOf(PropTypes.string).isRequired,
	setSelectedRecords: PropTypes.func.isRequired,
	records: PropTypes.arrayOf(
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
