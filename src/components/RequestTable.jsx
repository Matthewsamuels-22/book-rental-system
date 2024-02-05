import PropTypes from "prop-types";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { dateToIsoDateString } from "../utilities/dateformat";

export function RequestTable(props) {
	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Book</TableCell>
						<TableCell>Quantity</TableCell>
						<TableCell>Date Requested</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.requests.map((request, index) => (
						<TableRow key={index}>
							<TableCell>{request.id}</TableCell>
							<TableCell>{request.book}</TableCell>
							<TableCell>{request.quantity}</TableCell>
							<TableCell>{dateToIsoDateString(request.requestedDate)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

RequestTable.propTypes = {
	requests: PropTypes.arrayOf(
		PropTypes.exact({
			id: PropTypes.string.isRequired,
			requester: PropTypes.string.isRequired,
			book: PropTypes.string.isRequired,
			requestedDate: PropTypes.instanceOf(Date).isRequired,
			quantity: PropTypes.number.isRequired,
		}).isRequired
	).isRequired
}