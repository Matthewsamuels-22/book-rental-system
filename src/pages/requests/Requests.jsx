import { Fragment, useContext, useEffect, useState } from "react";
import { FaBan, FaPlus } from "react-icons/fa";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { BookContext } from "../../contexts/BookContext";
import { RequestContext } from "../../contexts/RequestContext";
import { auth } from "../../firebase";
import { getBooks } from "../../helpers/firestore/books";
import { getBookRequests, updateBookRequest } from "../../helpers/firestore/requests";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { RequestDialog } from "./RequestDialog";
import { RequestTable } from "./RequestTable";

export function Requests() {
	const { books, setBooks } = useContext(BookContext);
	const { requests, setRequests } = useContext(RequestContext);

	const [open, setOpen] = useState(false);
	const [dataIsLoaded, setDataIsLoaded] = useState(false);
	const [selectedRequests, setSelectedRequests] = useState([]);

	useEffect(() => {
		const dataRequests = [];

		if (requests.length === 0) {
			const requestsRequest = getBookRequests(auth.currentUser.uid).then((x) =>
				setRequests(x),
			);
			dataRequests.push(requestsRequest);
		}

		if (books.length === 0) {
			const booksRequest = getBooks().then((x) => setBooks(x));
			dataRequests.push(booksRequest);
		}

		Promise.all(dataRequests).then(() => setDataIsLoaded(true));
	}, []);

	useDocumentTitle("Requests");

	async function handleCancel() {
		for (const requestId of selectedRequests) {
			const request = requests.find((x) => x.id === requestId);
			if (request.status !== "pending") continue;
			await updateBookRequest(requestId, { status: "canceled" });
			request.status = "canceled";
		}

		setRequests([...requests]);
		setSelectedRequests([]);
	}

	if (!dataIsLoaded) {
		return <Box>Loading...</Box>;
	}

	return (
		<Fragment>
			<Stack direction="row" spacing={2}>
				<Button
					variant="contained"
					onClick={() => setOpen(true)}
					startIcon={<FaPlus />}
					sx={{ fontWeight: "bold", textTransform: "none" }}>
					New request
				</Button>
				<Button
					color="error"
					onClick={handleCancel}
					disabled={selectedRequests.length === 0}
					startIcon={<FaBan />}
					sx={{ fontWeight: "bold", textTransform: "none" }}>
					Cancel
				</Button>
			</Stack>

			<RequestTable
				records={requests}
				selectedRecords={selectedRequests}
				setSelectedRecords={setSelectedRequests}
				books={books}
			/>
			<RequestDialog open={open} onClose={() => setOpen(false)} />
		</Fragment>
	);
}
