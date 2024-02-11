import { Fragment, useContext, useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { RequestDialog } from "./RequestDialog";
import { RequestTable } from "./RequestTable";
import { RequestContext } from "../../contexts/RequestContext";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { getBookRequests, updateBookRequest } from "../../helpers/firestore/requests";
import { auth } from "../../firebase";

export function Requests() {
	const { requests, setRequests } = useContext(RequestContext)

	const [open, setOpen] = useState(false);
	const [selectedRequests, setSelectedRequests] = useState([])

	useEffect(() => {
		if (requests.length === 0) {
			getBookRequests(auth.currentUser.uid).then(x => setRequests(x)).catch(console.error);
		}
	}, []);

	useDocumentTitle("Requests");

	async function handleCancel() {
		for (const requestId of selectedRequests) {
			const request = requests.find(x => x.id === requestId);
			if (request.status !== "pending") continue;
			await updateBookRequest(requestId, { status: "canceled" })
			request.status = "canceled"
		}

		setRequests([...requests]);
		setSelectedRequests([]);
	}

	return (
		<Fragment>
			<Stack direction='row'>
				<Button variant="contained" onClick={() => setOpen(true)}>
					New request
				</Button>
				<Button color="error" onClick={handleCancel} disabled={selectedRequests.length === 0}>Cancel</Button>
			</Stack>

			<RequestTable records={requests} selectedRecords={selectedRequests} setSelectedRecords={setSelectedRequests} />
			<RequestDialog open={open} onClose={() => setOpen(false)} />
		</Fragment>
	);
}
