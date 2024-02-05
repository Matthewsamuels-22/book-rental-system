import { useContext, useRef, useState } from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { BookAutocomplete } from "../../components/BookAutocomplete";
import { InventoryContext } from "../../contexts/InventoryContext";
import { addInventoryItem, updateInventoryItem } from "../../helpers/firestore/inventory";

export function InventoryForm(props) {
	const { inventory, setInventory } = useContext(InventoryContext)
	const bookInputRef = useRef(null)

	async function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);

		const inventoryData = {
			book: bookInputRef.current.dataset.id,
			quantity: parseInt(formData.get('quantity'))
		}

		if (props.inventory == null) {
			inventoryData.id = await addInventoryItem(inventoryData)
			setInventory([...inventory, inventoryData])
		} else {
			await updateInventoryItem(props.inventory.id, inventoryData)
			inventoryData.id = props.inventory.id
			const inventoryIndex = inventory.findIndex(x => x.id === inventoryData.id)
			setInventory(inventory.toSpliced(inventoryIndex, 1, inventoryData));
		}

		props.postSubmit();
	}

	return (
		<Stack component='form' id={props.id} onSubmit={handleSubmit} spacing={2}>
			<BookAutocomplete ref={bookInputRef} required inputProps={{ min: 0 }} />
			<TextField type="number" label="Quantity" name="quantity" required />
		</Stack>
	)
}

InventoryForm.propTypes = {
	id: PropTypes.string.isRequired,
	postSubmit: PropTypes.func.isRequired,
	inventory: PropTypes.exact({
		id: PropTypes.string.isRequired,
		book: PropTypes.string.isRequired,
		quantity: PropTypes.number.isRequired,
	}),
};