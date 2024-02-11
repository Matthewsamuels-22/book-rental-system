import { Fragment, useContext, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { RequestTable } from "./RequestTable";
import { RequestContext } from "../../../contexts/RequestContext";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { getBookRequests, updateBookRequest } from "../../../helpers/firestore/requests";

export function Requests() {
	const { requests, setRequests } = useContext(RequestContext)
	const [selectedRequests, setSelectedRequests] = useState([]);

	useEffect(() => {
		if (requests.length === 0) {
			getBookRequests().then(x => setRequests(x)).catch(console.error);
		}
	}, []);

	useDocumentTitle("Requests")

	async function markAsDone() {
		for (const requestId of selectedRequests) {
			const request = requests.find(x => x.id === requestId);
			if (request.status !== "pending") continue;
			await updateBookRequest(requestId, { status: "done" })
			request.status = "done"
		}

		setRequests([...requests]);
		setSelectedRequests([]);
	}

	return (
		<Fragment>
			<Stack direction='row'>
				<Button onClick={markAsDone}>Mark as done</Button>
				<TextField type="search" placeholder="Search" />
			</Stack>

			<RequestTable records={requests} selectedRecords={selectedRequests} setSelectedRecords={setSelectedRequests} />
		</Fragment>
	)
}