import PropTypes from "prop-types";

import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { dateToIsoDateString } from "../../utilities/dateformat";

export function BorrowTable(props) {
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
						<TableCell>Borrower</TableCell>
						<TableCell>Book</TableCell>
						<TableCell>Date Borrowed</TableCell>
						<TableCell>Date Returned</TableCell>
						<TableCell>Condition Borrowed</TableCell>
						<TableCell>Condition Returned</TableCell>
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
								{props.students.find((x) => x.id === entry.borrower).name}
							</TableCell>
							<TableCell>
								{props.books.find((x) => x.id === entry.book).title}
							</TableCell>
							<TableCell>{dateToIsoDateString(entry.dateBorrowed)}</TableCell>
							<TableCell>{dateToIsoDateString(entry.dateReturned)}</TableCell>
							<TableCell>{entry.conditionBorrowed}</TableCell>
							<TableCell>{entry.conditionReturned}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

BorrowTable.propTypes = {
	selectedRecords: PropTypes.arrayOf(PropTypes.string).isRequired,
	setSelectedRecords: PropTypes.func.isRequired,
	records: PropTypes.arrayOf(
		PropTypes.exact({
			id: PropTypes.string.isRequired,
			borrower: PropTypes.string.isRequired,
			book: PropTypes.string.isRequired,
			dateBorrowed: PropTypes.instanceOf(Date).isRequired,
			dateReturned: PropTypes.instanceOf(Date),
			conditionBorrowed: PropTypes.string.isRequired,
			conditionReturned: PropTypes.string,
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
	students: PropTypes.arrayOf(
		PropTypes.exact({
			id: PropTypes.string.isRequired,
			schoolId: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			gradeLevels: PropTypes.arrayOf(
				PropTypes.exact({
					grade: PropTypes.number.isRequired,
					class: PropTypes.string.isRequired,
					logDate: PropTypes.instanceOf(Date).isRequired,
				}).isRequired,
			).isRequired,
		}).isRequired,
	).isRequired,
};
