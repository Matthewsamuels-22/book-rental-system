import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";

/**
 * @param {string} docId
 */
export async function deleteBorrowEntry(docId) {
	console.debug("deleteBorrowEntry:", docId);
	const collectionRef = collection(firestore, "users", auth.currentUser.uid, "borrows");
	await deleteDoc(doc(collectionRef, docId));
}

/**
 * @param {string} docId
 * @param {object} data
 */
export async function updateBorrowEntry(docId, data) {
	console.debug("updateBorrowEntry:", docId, data);
	const collectionRef = collection(firestore, "users", auth.currentUser.uid, "borrows");
	await updateDoc(doc(collectionRef, docId), data);
}

/**
 * @param {object} data
 */
export async function addBorrowEntry(data) {
	console.debug("addBorrowEntry:", data);
	const collectionRef = collection(firestore, "users", auth.currentUser.uid, "borrows");
	const documentRef = await addDoc(collectionRef, data);
	return documentRef.id;
}

export async function getBorrowEntries() {
	const entries = [];
	const collectionRef = collection(firestore, "users", auth.currentUser.uid, "borrows");
	const querySnapshot = await getDocs(collectionRef);

	querySnapshot.forEach((documentSnapshot) => {
		const data = documentSnapshot.data();

		entries.push({
			...data,
			id: documentSnapshot.id,
			dateBorrowed: data.dateBorrowed.toDate(),
			dateReturned: data.dateReturned?.toDate(),
		});
	});

	return entries;
}
