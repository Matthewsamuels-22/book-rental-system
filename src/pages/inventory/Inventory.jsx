import { Fragment, useContext, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { InventoryContext } from "../../contexts/InventoryContext";
import { deleteInventoryItem, getInventory } from "../../helpers/firestore/inventory";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { InventoryDialog } from "./InventoryDialog";
import { InventoryTable } from "./InventoryTable";

export function Inventory() {
	const { inventory, setInventory } = useContext(InventoryContext);

	const [open, setOpen] = useState(false);
	const [selectedInventoryItems, setSelectedInventoryItems] = useState([]);
	const [entrySelected, setEntrySelected] = useState(null);

	useEffect(() => {
		if (inventory.length !== 0) return;

		getInventory()
			.then((x) => setInventory(x))
			.catch(console.error);
	}, []);

	useDocumentTitle("Inventory");

	function handleAdd() {
		setEntrySelected(null);
		setOpen(true);
	}

	function handleEdit() {
		const entryId = selectedInventoryItems[0];
		const entry = inventory.find((x) => x.id === entryId);
		setEntrySelected(entry);
		setOpen(true);
	}

	async function handleDelete() {
		for (const id of selectedInventoryItems) await deleteInventoryItem(id);

		setInventory(inventory.filter((x) => !selectedInventoryItems.includes(x.id)));
		setSelectedInventoryItems([]);
	}

	return (
		<Fragment>
			<Stack direction="row">
				<Button variant="contained" onClick={handleAdd}>
					Add
				</Button>
				<Button
					color="secondary"
					onClick={handleEdit}
					disabled={selectedInventoryItems.length !== 1}>
					Edit
				</Button>
				<Button
					color="error"
					onClick={handleDelete}
					disabled={selectedInventoryItems.length === 0}>
					Delete
				</Button>
				<TextField type="search" placeholder="Search" />
			</Stack>

			<InventoryTable
				records={inventory}
				selectedRecords={selectedInventoryItems}
				setSelectedRecords={setSelectedInventoryItems}
			/>
			<InventoryDialog open={open} onClose={() => setOpen(false)} inventory={entrySelected} />
		</Fragment>
	);
}
