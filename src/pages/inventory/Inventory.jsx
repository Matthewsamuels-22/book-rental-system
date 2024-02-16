import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { FaPen, FaPlus, FaSearch, FaTrash } from "react-icons/fa";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { BookContext } from "../../contexts/BookContext";
import { InventoryContext } from "../../contexts/InventoryContext";
import { getBooks } from "../../helpers/firestore/books";
import { deleteInventoryItem, getInventory } from "../../helpers/firestore/inventory";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useSearchField } from "../../hooks/useSearchField";
import { InventoryDialog } from "./InventoryDialog";
import { InventoryTable } from "./InventoryTable";

export function Inventory() {
	const { books, setBooks } = useContext(BookContext);
	const { inventory, setInventory } = useContext(InventoryContext);

	const [open, setOpen] = useState(false);
	const [dataIsLoaded, setDataIsLoaded] = useState(false);
	const [selectedInventoryItems, setSelectedInventoryItems] = useState([]);
	const [entrySelected, setEntrySelected] = useState(null);

	const {
		searchResults: rawSearchResults,
		emptySearchResults,
		handleSearch,
	} = useSearchField((query) => {
		const bookResults = books.filter((x) => x.title.toLowerCase().includes(query));
		return inventory.filter((x) => bookResults.some((y) => y.id === x.book));
	});

	const searchResults = useMemo(
		() => inventory.filter((x) => rawSearchResults.some((y) => y.id === x.id)),
		[rawSearchResults, books, inventory],
	);

	useEffect(() => {
		const dataRequests = [];

		if (inventory.length === 0) {
			const inventoryRequest = getInventory().then((x) => setInventory(x));
			dataRequests.push(inventoryRequest);
		}

		if (books.length === 0) {
			const booksRequest = getBooks().then((x) => setBooks(x));
			dataRequests.push(booksRequest);
		}

		Promise.all(dataRequests).then(() => setDataIsLoaded(true));
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

	if (!dataIsLoaded) {
		return <Box>Loading...</Box>;
	}

	return (
		<Fragment>
			<Stack direction="row" spacing={2}>
				<Button
					variant="contained"
					onClick={handleAdd}
					startIcon={<FaPlus />}
					sx={{ fontWeight: "bold", textTransform: "none" }}>
					Add
				</Button>
				<Button
					color="secondary"
					onClick={handleEdit}
					disabled={selectedInventoryItems.length !== 1}
					startIcon={<FaPen />}
					sx={{ fontWeight: "bold", textTransform: "none" }}>
					Edit
				</Button>
				<Button
					color="error"
					onClick={handleDelete}
					disabled={selectedInventoryItems.length === 0}
					startIcon={<FaTrash />}
					sx={{ fontWeight: "bold", textTransform: "none" }}>
					Delete
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

			<InventoryTable
				records={!emptySearchResults ? searchResults : inventory}
				selectedRecords={selectedInventoryItems}
				setSelectedRecords={setSelectedInventoryItems}
				books={books}
			/>
			<InventoryDialog open={open} onClose={() => setOpen(false)} inventory={entrySelected} />
		</Fragment>
	);
}
