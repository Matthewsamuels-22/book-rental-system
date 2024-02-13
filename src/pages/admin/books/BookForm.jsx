import PropTypes from "prop-types";
import { useContext, useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { BookContext } from "../../../contexts/BookContext";
import { addBook, updateBook } from "../../../helpers/firestore/books";

function createAuthor() {
	return {
		uuid: window.crypto.randomUUID(),
		name: "",
	};
}

export function BookForm(props) {
	const { books, setBooks } = useContext(BookContext);
	const [authors, setAuthors] = useState(
		props.book?.authors.map((x) => ({ uuid: window.crypto.randomUUID(), name: x })) ?? [
			createAuthor(),
		],
	);

	function addAuthor() {
		setAuthors([...authors, createAuthor()]);
	}

	function removeAuthor(authorIndex) {
		setAuthors(authors.filter((_, index) => index !== authorIndex));
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);

		const title = formData.get("title");
		const edition = formData.get("edition");
		const volume = formData.get("volume");
		const publisher = formData.get("publisher");
		const yearPublished = formData.get("year-published");

		const bookData = {
			title,
			edition: parseInt(edition) || 0,
			volume: parseInt(volume) || 0,
			publisher,
			yearPublished: parseInt(yearPublished) || 0,
			authors: authors.map((_, index) => formData.get("author-" + index)),
		};

		if (props.book == null) {
			bookData.id = await addBook(bookData);
			setBooks([...books, bookData]);
		} else {
			await updateBook(props.book.id, bookData);
			bookData.id = props.book.id;
			const bookIndex = books.findIndex((x) => x.id === props.book.id);
			setBooks(books.toSpliced(bookIndex, 1, bookData));
		}

		props.postSubmit();
	}

	return (
		<Stack component="form" id={props.id} onSubmit={handleSubmit} spacing={2}>
			<TextField label="Title" name="title" defaultValue={props.book?.title} required />
			<Stack component="fieldset" border="none" padding={0} spacing={2}>
				<Typography component="legend">Authors</Typography>
				{authors.map((author, index) => (
					<Stack key={author.uuid} direction="row" spacing={2}>
						<TextField
							label="Author"
							name={"author-" + index}
							defaultValue={author.name}
							fullWidth
							required
						/>
						{authors.length > 1 && (
							<Button
								type="button"
								variant="outlined"
								color="error"
								onClick={() => removeAuthor(index)}>
								Remove
							</Button>
						)}
					</Stack>
				))}
				<Button type="button" variant="contained" onClick={addAuthor}>
					Add author
				</Button>
			</Stack>
			<Stack direction="row" spacing={2}>
				<TextField
					type="number"
					label="Edition"
					name="edition"
					defaultValue={props.book?.edition}
					inputProps={{ min: 0 }}
				/>
				<TextField
					type="number"
					label="Volume"
					name="volume"
					defaultValue={props.book?.volume}
					inputProps={{ min: 0 }}
				/>
			</Stack>
			<Stack direction="row" flexWrap="wrap" spacing={2} useFlexGap>
				<TextField
					label="Publisher"
					name="publisher"
					defaultValue={props.book?.publisher}
				/>
				<TextField
					type="number"
					label="Year published"
					name="year-published"
					defaultValue={props.book?.yearPublished}
					inputProps={{ min: 0 }}
				/>
			</Stack>
		</Stack>
	);
}

BookForm.propTypes = {
	id: PropTypes.string.isRequired,
	postSubmit: PropTypes.func.isRequired,
	book: PropTypes.exact({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		authors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
		edition: PropTypes.number.isRequired,
		volume: PropTypes.number.isRequired,
		publisher: PropTypes.string.isRequired,
		yearPublished: PropTypes.number.isRequired,
	}),
};
