import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

/**
 * @param {string} docId
 */
export async function deleteBookRequest(docId) {
	console.debug("deleteBookRequest:", docId);
	const collectionRef = collection(firestore, "requests");
	await deleteDoc(doc(collectionRef, docId));
}

/**
 * @param {string} docId
 * @param {object} data
 */
export async function updateBookRequest(docId, data) {
	console.debug("updateBookRequest:", docId, data);
	const collectionRef = collection(firestore, "requests");
	await updateDoc(doc(collectionRef, docId), data);
}

/**
 * @param {object} data
 */
export async function addBookRequest(data) {
	console.debug("addBookRequest:", data);
	const collectionRef = collection(firestore, "requests");
	const documentRef = await addDoc(collectionRef, data);
	return documentRef.id;
}

export async function getBookRequests() {
	const requests = [];
	const collectionRef = collection(firestore, "requests");
	const querySnapshot = await getDocs(collectionRef);

	querySnapshot.forEach((documentSnapshot) => {
		requests.push({
			...documentSnapshot.data(),
			id: documentSnapshot.id,
		});
	});

	return requests;
}
