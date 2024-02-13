import PropTypes from "prop-types";
import { forwardRef, useContext, useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { BookContext } from "../contexts/BookContext";

/**
 * @param {string[]} authors
 */
function formatAuthors(authors) {
	const lastName = (x) => x.substring(x.lastIndexOf(" ") + 1);
	if (authors.length > 2) return `${lastName(authors[0])} et al.`;
	if (authors.length === 2) return `${lastName(authors[0])} & ${lastName(authors[1])}`;
	return lastName(authors[0]);
}

function BookAutocompleteRender(props, ref) {
	const { books } = useContext(BookContext);
	const [bookId, setBookId] = useState(props.defaultValue);

	return (
		<Autocomplete
			options={books}
			getOptionLabel={(option) => option.title}
			defaultValue={books.find((x) => x.id === bookId)}
			disableClearable
			onChange={(event, value) => setBookId(value.id)}
			renderOption={(properties, option) => (
				<Stack component="li" {...properties}>
					<Typography
						component="div"
						fontWeight="bold"
						variant="body2"
						marginRight="auto">
						{option.title}
					</Typography>
					<Stack direction="row" useFlexGap spacing={2} sx={{ width: "100%" }}>
						<Typography component="div" variant="caption">
							{option.yearPublished}
						</Typography>
						<Typography component="div" variant="caption" marginRight="auto">
							{formatAuthors(option.authors)}
						</Typography>
						<Typography component="div" variant="caption">
							ed.&nbsp;{option.edition}
						</Typography>
						<Typography component="div" variant="caption">
							vol.&nbsp;{option.volume}
						</Typography>
					</Stack>
				</Stack>
			)}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Book"
					required={props.required ?? false}
					inputRef={ref}
					inputProps={{ ...params.inputProps, "data-id": bookId }}
				/>
			)}
		/>
	);
}

export const BookAutocomplete = forwardRef(BookAutocompleteRender);

BookAutocomplete.propTypes = {
	defaultValue: PropTypes.string,
	required: PropTypes.bool,
};
