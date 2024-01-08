import PropTypes from 'prop-types';
import { useContext, useState } from 'react';

import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack'
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography";

import { BookContext } from '../contexts/BookContext';

function createAuthor() {
	return {
		id: window.crypto.randomUUID(),
		name: ''
	};
}

export function BookForm(props) {
	const { books, setBooks } = useContext(BookContext)
	const [authors, setAuthors] = useState([createAuthor()])

	function addAuthor() {
		setAuthors([...authors, createAuthor()])
	}

	function removeAuthor(authorIndex) {
		setAuthors(authors.filter((_, index) => index !== authorIndex))
	}

	function handleSubmit(event) {
		event.preventDefault()
		const formData = new FormData(event.target)

		const title = formData.get('title')
		const edition = formData.get('edition')
		const volume = formData.get('volume')
		const publisher = formData.get('publisher')
		const yearPublished = formData.get('year-published')

		const bookData = {
			title,
			edition,
			volume,
			publisher,
			yearPublished,
			authors: authors.map((_, index) => formData.get('author-' + index)),
			id: window.crypto.randomUUID()
		};

		setBooks([...books, bookData]);
		console.log(bookData);
		props.postSubmit();
	}

	return (
		<Stack component='form' id={props.id} onSubmit={handleSubmit} spacing={2}>
			<TextField label='Title' name='title' required />
			<Stack component='fieldset' border='none' padding={0} spacing={2}>
				<Typography component='legend'>Authors</Typography>
				{authors.map((author, index) => (
					<Stack key={author.id} direction='row' spacing={2}>
						<TextField
							label='Author'
							name={'author-' + index}
							defaultValue={author.name}
							fullWidth
							required />
						{authors.length > 1 && (
							<Button
								type='button'
								variant='outlined'
								color='error'
								onClick={() => removeAuthor(index)}>
								Remove
							</Button>
						)}
					</Stack>
				))}
				<Button type='button' variant='contained' onClick={addAuthor}>
					Add author
				</Button>
			</Stack>
			<Stack direction='row' spacing={2}>
				<TextField
					type='number'
					label='Edition'
					name='edition'
					inputProps={{ min: 0 }} />
				<TextField
					type='number'
					label='Volume'
					name='volume'
					inputProps={{ min: 0 }} />
			</Stack>
			<Stack direction='row' flexWrap='wrap' spacing={2} useFlexGap>
				<TextField label='Publisher' name='publisher' />
				<TextField
					type='number'
					label='Year published'
					name='year-published'
					inputProps={{ min: 0 }} />
			</Stack>
		</Stack>
	);
}

BookForm.propTypes = {
	id: PropTypes.string.isRequired,
	postSubmit: PropTypes.func.isRequired
};