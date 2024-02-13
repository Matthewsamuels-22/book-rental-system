import { Fragment, useContext, useEffect, useState } from "react";
import { FaCheck, FaSearch } from "react-icons/fa";

import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { RequestContext } from "../../../contexts/RequestContext";
import { getBookRequests, updateBookRequest } from "../../../helpers/firestore/requests";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { RequestTable } from "./RequestTable";

export function Requests() {
	const { requests, setRequests } = useContext(RequestContext);
	const [selectedRequests, setSelectedRequests] = useState([]);

	useEffect(() => {
		if (requests.length === 0) {
			getBookRequests()
				.then((x) => setRequests(x))
				.catch(console.error);
		}
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
				records={requests}
				selectedRecords={selectedRequests}
				setSelectedRecords={setSelectedRequests}
			/>
		</Fragment>
	);
}
