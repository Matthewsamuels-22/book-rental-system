import PropTypes from "prop-types";
import { useContext, useRef } from "react";

import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { BookAutocomplete } from "../../components/BookAutocomplete";
import { StudentAutocomplete } from "../../components/StudentAutocomplete";
import { BorrowContext } from "../../contexts/BorrowContext";
import { addBorrowEntry, updateBorrowEntry } from "../../helpers/firestore/borrows";
import { dateToIsoDateString } from "../../utilities/dateformat";
import { dateFromIsoDateString } from "../../utilities/dateparser";

export function BorrowForm(props) {
	const { borrows, setBorrows } = useContext(BorrowContext);

	const studentInputRef = useRef(null);
	const bookInputRef = useRef(null);

	async function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);

		const borrower = studentInputRef.current.dataset.id;
		const book = bookInputRef.current.dataset.id;
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
		};

		if (props.borrowEntry == null) {
			borrowData.id = await addBorrowEntry(borrowData);
			setBorrows([...borrows, borrowData]);
		} else {
			await updateBorrowEntry(props.borrowEntry.id, borrowData);
			borrowData.id = props.borrowEntry.id;
			const borrowIndex = borrows.findIndex((x) => x.id === borrowData.id);
			setBorrows(borrows.toSpliced(borrowIndex, 1, borrowData));
		}

		props.postSubmit();
	}

	return (
		<Stack component="form" id={props.id} onSubmit={handleSubmit} spacing={2}>
			<StudentAutocomplete
				ref={studentInputRef}
				label="Borrower"
				defaultValue={props.borrowEntry?.borrower}
				required
			/>
			<BookAutocomplete ref={bookInputRef} defaultValue={props.borrowEntry?.book} required />
			<Stack direction="row" spacing={2}>
				<TextField
					type="date"
					label="Date borrowed"
					name="date-borrowed"
					defaultValue={dateToIsoDateString(
						props.borrowEntry?.dateBorrowed ?? new Date(),
					)}
					fullWidth
					required
				/>
				<TextField
					type="date"
					label="Date returned"
					name="date-returned"
					defaultValue={props.borrowEntry?.dateReturned}
					fullWidth
				/>
			</Stack>
			<Stack direction="row" spacing={2}>
				<TextField
					select
					label="Condition borrowed"
					name="condition-borrowed"
					defaultValue={props.borrowEntry?.conditionBorrowed}
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
					defaultValue={props.borrowEntry?.conditionReturned}
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
	borrowEntry: PropTypes.exact({
		id: PropTypes.string.isRequired,
		borrower: PropTypes.string.isRequired,
		book: PropTypes.string.isRequired,
		dateBorrowed: PropTypes.instanceOf(Date).isRequired,
		dateReturned: PropTypes.instanceOf(Date),
		conditionBorrowed: PropTypes.string.isRequired,
		conditionReturned: PropTypes.string,
	}),
};
