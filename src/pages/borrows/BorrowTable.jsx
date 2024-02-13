import PropTypes from "prop-types";
import { useContext, useEffect } from "react";

import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { BookContext } from "../../contexts/BookContext";
import { StudentContext } from "../../contexts/StudentContext";
import { getBooks } from "../../helpers/firestore/books";
import { getStudents } from "../../helpers/firestore/students";
import { dateToIsoDateString } from "../../utilities/dateformat";

export function BorrowTable(props) {
	const { books, setBooks } = useContext(BookContext);
	const { students, setStudents } = useContext(StudentContext);

	useEffect(() => {
		if (books.length === 0) {
			getBooks()
				.then((x) => setBooks(x))
				.catch(console.error);
		}

		if (students.length === 0) {
			getStudents()
				.then((x) => setStudents(x))
				.catch(console.error);
		}
	}, []);

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
					{props.records.map((entry, index) => (
						<TableRow key={index}>
							<TableCell>
								<Checkbox
									onChange={handleRecordSelect}
									disabled={props.selectedRecords.length > 10}
									inputProps={{ "data-id": entry.id }}
								/>
							</TableCell>
							<TableCell>
								{students.find((x) => x.id === entry.borrower).name}
							</TableCell>
							<TableCell>{books.find((x) => x.id === entry.book).title}</TableCell>
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
};
