import { Fragment, useContext, useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { RequestDialog } from "../components/RequestDialog";
import { RequestTable } from "../components/RequestTable";
import { BookContext } from "../contexts/BookContext";
import { getBooks } from "../helpers/firestore/books";
import { RequestContext } from "../contexts/RequestContext";

export function Request() {
	const { books, setBooks } = useContext(BookContext);
	const { requests, setRequests } = useContext(RequestContext)

	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (books.length === 0) {
			getBooks()
				.then((x) => setBooks(x))
				.catch(console.error);
		}

		if (requests.length === 0) {
			// fetch requests
		}
	}, []);

	return (
		<Fragment>
			<Stack direction='row'>
				<Button variant="contained" onClick={() => setOpen(true)}>
					New request
				</Button>
				<Button color="error">Cancel</Button>
			</Stack>

			<RequestTable requests={requests} />
			<RequestDialog open={open} onClose={() => setOpen(false)} />
		</Fragment>
	);
}
