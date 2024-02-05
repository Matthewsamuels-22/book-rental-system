import PropTypes from "prop-types";

import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { dateToIsoDateString } from "../../../utilities/dateformat";


export function RequestTable(props) {
	function handleRequestSelect(event) {
		const checkbox = event.target;
		const requestId = checkbox.dataset.id;

		if (checkbox.checked) {
			props.setRequestSelection([...props.requestSelection, requestId]);
			return;
		}

		props.setRequestSelection(props.requestSelection.filter((x) => x !== requestId));
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
					</TableRow>
				</TableHead>
				<TableBody>
					{props.requests.map((request, index) => (
						<TableRow key={index}>
							<TableCell>
								<Checkbox
									onChange={handleRequestSelect}
									disabled={props.requestSelection.length > 10}
									inputProps={{ "data-id": request.id }}
								/>
							</TableCell>
							<TableCell>{request.requester}</TableCell>
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
	requestSelection: PropTypes.arrayOf(PropTypes.string).isRequired,
	setRequestSelection: PropTypes.func.isRequired,
	requests: PropTypes.arrayOf(
		PropTypes.exact({
			id: PropTypes.string.isRequired,
			requester: PropTypes.string.isRequired,
			book: PropTypes.string.isRequired,
			requestedDate: PropTypes.instanceOf(Date).isRequired,
			quantity: PropTypes.number.isRequired,
		}).isRequired
	).isRequired
};