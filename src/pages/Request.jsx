import Button from "@mui/material/Button";
import { Fragment, useState } from "react";
import { RequestDialog } from "../components/RequestDialog";
import { RequestTable } from "../components/RequestTable";

export function Request() {
	const [open, setOpen] = useState(false);
	return (
		<Fragment>
			<RequestTable />
			<Button variant="contained" onClick={() => setOpen(true)}>
				New Request
			</Button>
			<RequestDialog open={open} onClose={() => setOpen(false)} />
		</Fragment>
	);
}
