import {
	addDoc,
	collection,
	collectionGroup,
	deleteDoc,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
	writeBatch,
} from "firebase/firestore";
import { firestore } from "../../firebase";

/**
 * @param {string} docId
 * @param {object[]} requests
 */
export async function deleteEverythingForBook(docId, requests) {
	console.debug("deleteEverythingForBook:", docId, requests);
	const batch = writeBatch(firestore);

	const documentRef = doc(firestore, "books", docId);
	batch.delete(documentRef);

	const inventoriesQuery = query(collectionGroup(firestore, "books"), where("book", "==", docId));
	const inventoriesQuerySnapshot = await getDocs(inventoriesQuery);
	inventoriesQuerySnapshot.forEach((x) => batch.delete(x.ref));

	const borrowsQuery = query(collectionGroup(firestore, "borrows"), where("book", "==", docId));
	const borrowsQuerySnapshot = await getDocs(borrowsQuery);
	borrowsQuerySnapshot.forEach((x) => batch.delete(x.ref));

	requests.forEach((x) => batch.delete(doc(firestore, "requests", x.id)));

	await batch.commit();
}

/**
 * @param {string} docId
 */
export async function deleteBook(docId) {
	console.debug("deleteBook:", docId);
	const collectionRef = collection(firestore, "books");
	await deleteDoc(doc(collectionRef, docId));
}

/**
 * @param {string} docId
 * @param {object} data
 */
export async function updateBook(docId, data) {
	console.debug("updateBook:", docId, data);
	const collectionRef = collection(firestore, "books");
	await updateDoc(doc(collectionRef, docId), data);
}

/**
 * @param {object} data
 */
export async function addBook(data) {
	console.debug("addBook:", data);
	const collectionRef = collection(firestore, "books");
	const documentRef = await addDoc(collectionRef, data);
	return documentRef.id;
}

export async function getBooks() {
	const books = [];
	const collectionRef = collection(firestore, "books");
	const querySnapshot = await getDocs(collectionRef);

	querySnapshot.forEach((documentSnapshot) => {
		books.push({
			...documentSnapshot.data(),
			id: documentSnapshot.id,
		});
	});

	return books;
}
