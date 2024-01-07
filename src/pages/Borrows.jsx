import { Fragment, useState } from "react";
import Button from "@mui/material/Button";

import { BorrowDialog } from "../components/BorrowDialog";
import { BorrowTable } from '../components/BorrowTable';

export function Borrows() {
	const [open, setOpen] = useState(false)

	return (
		<Fragment>
			<BorrowTable />
			<Button variant='contained' onClick={() => setOpen(true)}>
				Add new record
			</Button>
			<BorrowDialog open={open} onClose={() => setOpen(false)} />
		</Fragment>
	)
}