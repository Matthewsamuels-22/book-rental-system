import PropTypes from "prop-types";
import { useContext } from "react";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { RequestContext } from "../contexts/RequestContext";
import { auth } from "../firebase";

export function RequestForm(props) {
	const { requests, setRequests } = useContext(RequestContext);

	function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);

		const book = formData.get("book");
		const quantity = formData.get("quantity");

		const requestData = {
			book,
			quantity,
			requester: auth.currentUser.uid,
			requestedDate: new Date(),
			id: window.crypto.randomUUID(),
		};

		setRequests([...requests, requestData]);
		console.log(requestData);
		props.postSubmit();
	}
	return (
		<Stack component="form" id={props.id} onSubmit={handleSubmit} spacing={2}>
			<TextField label="Book" name="book" required />
			<TextField
				type="number"
				label="Quantity"
				name="quantity"
				required
				inputProps={{ min: 0 }}
			/>
		</Stack>
	);
}

RequestForm.propTypes = {
	id: PropTypes.string.isRequired,
	postSubmit: PropTypes.func.isRequired,
};
