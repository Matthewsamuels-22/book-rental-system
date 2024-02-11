import PropTypes from "prop-types";
import { useContext, useEffect } from "react";

import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { dateToIsoDateString } from "../../../utilities/dateformat";
import { BookContext } from "../../../contexts/BookContext";
import { getBooks } from "../../../helpers/firestore/books";


export function RequestTable(props) {
	const { books, setBooks } = useContext(BookContext);

	useEffect(() => {
		if (books.length === 0) {
			getBooks()
				.then((x) => setBooks(x))
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
						<TableCell></TableCell>
						<TableCell>Requester</TableCell>
						<TableCell>Book</TableCell>
						<TableCell>Quantity</TableCell>
						<TableCell>Date Requested</TableCell>
						<TableCell>Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.records.map((request, index) => (
						<TableRow key={index}>
							<TableCell>
								<Checkbox
									onChange={handleRecordSelect}
									disabled={props.selectedRecords.length > 10}
									inputProps={{ "data-id": request.id }}
								/>
							</TableCell>
							<TableCell>{request.requester}</TableCell>
							<TableCell>{books.find(x => x.id === request.book).title}</TableCell>
							<TableCell>{request.quantity}</TableCell>
							<TableCell>{dateToIsoDateString(request.requestedDate)}</TableCell>
							<TableCell>{request.status}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

RequestTable.propTypes = {
	selectedRecords: PropTypes.arrayOf(PropTypes.string).isRequired,
	setSelectedRecords: PropTypes.func.isRequired,
	records: PropTypes.arrayOf(
		PropTypes.exact({
			id: PropTypes.string.isRequired,
			requester: PropTypes.string.isRequired,
			book: PropTypes.string.isRequired,
			requestedDate: PropTypes.instanceOf(Date).isRequired,
			quantity: PropTypes.number.isRequired,
			status: PropTypes.oneOf(["pending", "canceled", "done"])
		}).isRequired
	).isRequired
};