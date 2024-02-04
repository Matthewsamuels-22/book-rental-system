import { Fragment, useContext, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { InventoryTable } from "./InventoryTable";
import { InventoryDialog } from "./InventoryDialog";
import { InventoryContext } from "../../contexts/InventoryContext";
import { deleteInventoryItem, getInventory } from "../../helpers/firestore/inventory";

export function Inventory() {
	const { inventory, setInventory } = useContext(InventoryContext)

	const [open, setOpen] = useState(false);
	const [inventorySelection, setInventorySelection] = useState([]);
	const [entrySelected, setEntrySelected] = useState(null);

	useEffect(() => {
		if (inventory.length !== 0) return;

		getInventory()
			.then((x) => setInventory(x))
			.catch(console.error);
	}, []);

	function handleAdd() {
		setEntrySelected(null);
		setOpen(true);
	}

	function handleEdit() {
		const entryId = inventorySelection[0];
		const entry = inventory.find((x) => x.id === entryId);
		setEntrySelected(entry);
		setOpen(true);
	}

	async function handleDelete() {
		for (const id of inventorySelection) await deleteInventoryItem(id);

		setInventory(inventory.filter((x) => !inventorySelection.includes(x.id)));
		setInventorySelection([]);
	}

	return (
		<Fragment>
			<Stack direction='row'>
				<Button variant="contained" onClick={handleAdd}>Add</Button>
				<Button color="secondary" onClick={handleEdit} disabled={inventorySelection.length !== 1}>Edit</Button>
				<Button color="error" onClick={handleDelete} disabled={inventorySelection.length === 0}>Delete</Button>
				<TextField type="search" placeholder="Search" />
			</Stack>

			<InventoryTable inventory={inventory} inventorySelection={inventorySelection} setInventorySelection={setInventorySelection} />
			<InventoryDialog open={open} onClose={() => setOpen(false)} inventory={entrySelected} />
		</Fragment>
	)
}