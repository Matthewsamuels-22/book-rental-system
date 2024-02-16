import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { FaCheck, FaSearch } from "react-icons/fa";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { BookContext } from "../../../contexts/BookContext";
import { RequestContext } from "../../../contexts/RequestContext";
import { getBooks } from "../../../helpers/firestore/books";
import { getBookRequests, updateBookRequest } from "../../../helpers/firestore/requests";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { useSearchField } from "../../../hooks/useSearchField";
import { RequestTable } from "./RequestTable";

export function Requests() {
	const { books, setBooks } = useContext(BookContext);
	const { requests, setRequests } = useContext(RequestContext);

	const [selectedRequests, setSelectedRequests] = useState([]);
	const [dataIsLoaded, setDataIsLoaded] = useState(false);

	const {
		searchResults: rawSearchResults,
		emptySearchResults,
		handleSearch,
	} = useSearchField((query) => {
		const bookResults = books.filter((x) => x.title.toLowerCase().includes(query));
		return requests.filter((x) => bookResults.some((y) => y.id === x.book));
	});

	const searchResults = useMemo(
		() => requests.filter((x) => rawSearchResults.some((y) => y.id === x.id)),
		[rawSearchResults, books, requests],
	);

	useEffect(() => {
		const dataRequests = [];

		if (requests.length === 0) {
			const requestsRequest = getBookRequests().then((x) => setRequests(x));
			dataRequests.push(requestsRequest);
		}

		if (books.length === 0) {
			const booksRequest = getBooks().then((x) => setBooks(x));
			dataRequests.push(booksRequest);
		}

		Promise.all(dataRequests).then(() => setDataIsLoaded(true));
	}, []);

	useDocumentTitle("Requests");

	async function markAsDone() {
		for (const requestId of selectedRequests) {
			const request = requests.find((x) => x.id === requestId);
			if (request.status !== "pending") continue;
			await updateBookRequest(requestId, { status: "done" });
			request.status = "done";
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
					onClick={markAsDone}
					startIcon={<FaCheck />}
					sx={{ fontWeight: "bold", textTransform: "none" }}>
					Mark as done
				</Button>
				<TextField
					type="search"
					placeholder="Search"
					size="small"
					onChange={handleSearch}
					onKeyDown={handleSearch}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<FaSearch />
							</InputAdornment>
						),
					}}
				/>
			</Stack>

			<RequestTable
				records={!emptySearchResults ? searchResults : requests}
				selectedRecords={selectedRequests}
				setSelectedRecords={setSelectedRequests}
				books={books}
			/>
		</Fragment>
	);
}
