import { Fragment, useContext, useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { RequestTable } from "./RequestTable";
import { RequestContext } from "../../../contexts/RequestContext";

export function Requests() {
	const { requests } = useContext(RequestContext)
	const [requestSelection, setRequestSelection] = useState([]);

	function markAsDone() {

	}

	return (
		<Fragment>
			<Stack direction='row'>
				<Button onClick={markAsDone}>Mark as done</Button>
				<TextField type="search" placeholder="Search" />
			</Stack>

			<RequestTable requests={requests} requestSelection={requestSelection} setRequestSelection={setRequestSelection} />
		</Fragment>
	)
}