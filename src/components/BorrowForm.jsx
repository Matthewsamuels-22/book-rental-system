import PropTypes from "prop-types";
import { useContext } from "react";

import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { BorrowContext } from "../contexts/BorrowContext";
import { dateToIsoDateString } from "../utilities/dateformat";
import { dateFromIsoDateString } from "../utilities/dateparser";

export function BorrowForm(props) {
	const { borrows, setBorrows } = useContext(BorrowContext);

	function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);

		const borrower = formData.get("borrower");
		const book = formData.get("book");
		const dateBorrowed = dateFromIsoDateString(formData.get("date-borrowed"));
		const dateReturned = dateFromIsoDateString(formData.get("date-returned"));
		const conditionBorrowed = formData.get("condition-borrowed");
		const conditionReturned = formData.get("condition-returned");

		const borrowData = {
			borrower,
			book,
			dateBorrowed,
			dateReturned,
			conditionBorrowed,
			conditionReturned,
			id: window.crypto.randomUUID(),
		};

		setBorrows([...borrows, borrowData]);
		console.log(borrowData);
		props.postSubmit();
	}

	return (
		<Stack component="form" id={props.id} onSubmit={handleSubmit} spacing={2}>
			<TextField label="Borrower" name="borrower" required />
			<TextField label="Book" name="book" required />
			<Stack direction="row" spacing={2}>
				<TextField
					type="date"
					label="Date borrowed"
					name="date-borrowed"
					defaultValue={dateToIsoDateString(new Date())}
					fullWidth
					required
				/>
				<TextField type="date" label="Date returned" name="date-returned" fullWidth />
			</Stack>
			<Stack direction="row" spacing={2}>
				<TextField
					select
					label="Condition borrowed"
					name="condition-borrowed"
					defaultValue=""
					required
					sx={{ width: "20ch" }}>
					<MenuItem />
					<MenuItem value="A">Excellent</MenuItem>
					<MenuItem value="B">Good</MenuItem>
					<MenuItem value="C">Usable</MenuItem>
					<MenuItem value="D">Terrible</MenuItem>
				</TextField>
				<TextField
					select
					label="Condition returned"
					name="condition-returned"
					defaultValue=""
					sx={{ width: "20ch" }}>
					<MenuItem />
					<MenuItem value="A">Excellent</MenuItem>
					<MenuItem value="B">Good</MenuItem>
					<MenuItem value="C">Usable</MenuItem>
					<MenuItem value="D">Terrible</MenuItem>
				</TextField>
			</Stack>
		</Stack>
	);
}

BorrowForm.propTypes = {
	id: PropTypes.string.isRequired,
	postSubmit: PropTypes.func.isRequired,
};
