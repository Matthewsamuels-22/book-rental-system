import Button from "@mui/material/Button";
import { Fragment, useState } from "react";

import { BookDialog } from "../components/BookDialog";
import { BookTable } from "../components/BookTable";

export function Books() {
	const [open, setOpen] = useState(false);

	return (
		<Fragment>
			<BookTable />
			<Button variant="contained" onClick={() => setOpen(true)}>
				Add new record
			</Button>
			<BookDialog open={open} onClose={() => setOpen(false)} />
		</Fragment>
	);
}
