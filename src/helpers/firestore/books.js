import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

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
