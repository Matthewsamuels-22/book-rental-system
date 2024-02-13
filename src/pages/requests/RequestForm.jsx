import PropTypes from "prop-types";
import { useContext, useRef } from "react";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { BookAutocomplete } from "../../components/BookAutocomplete";
import { RequestContext } from "../../contexts/RequestContext";
import { auth } from "../../firebase";
import { addBookRequest } from "../../helpers/firestore/requests";

export function RequestForm(props) {
	const { requests, setRequests } = useContext(RequestContext);
	const bookInputRef = useRef(null);

	async function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);

		const book = bookInputRef.current.dataset.id;
		const quantity = formData.get("quantity");

		const requestData = {
			book,
			quantity: parseInt(quantity),
			requester: auth.currentUser.uid,
			requestedDate: new Date(),
			status: "pending",
		};

		requestData.id = await addBookRequest(requestData);
		setRequests([...requests, requestData]);
		props.postSubmit();
	}
	return (
		<Stack component="form" id={props.id} onSubmit={handleSubmit} spacing={2}>
			<BookAutocomplete ref={bookInputRef} required />
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
