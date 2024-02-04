import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";

/**
 * @param {string} docId
 */
export async function deleteInventoryItem(docId) {
	console.debug("deleteInventoryItem:", docId);
	const collectionRef = collection(firestore, "users", auth.currentUser.uid, "books");
	await deleteDoc(doc(collectionRef, docId));
}

/**
 * @param {string} docId
 * @param {object} data
 */
export async function updateInventoryItem(docId, data) {
	console.debug("updateInventoryItem:", docId, data);
	const collectionRef = collection(firestore, "users", auth.currentUser.uid, "books");
	await updateDoc(doc(collectionRef, docId), data);
}

/**
 * @param {object} data
 */
export async function addInventoryItem(data) {
	console.debug("addInventoryItem:", data);
	const collectionRef = collection(firestore, "users", auth.currentUser.uid, "books");
	const documentRef = await addDoc(collectionRef, data);
	return documentRef.id;
}

export async function getInventory() {
	const inventory = [];
	const collectionRef = collection(firestore, "users", auth.currentUser.uid, "books");
	const querySnapshot = await getDocs(collectionRef);

	querySnapshot.forEach((documentSnapshot) => {
		inventory.push({
			...documentSnapshot.data(),
			id: documentSnapshot.id,
		});
	});

	return inventory;
}
