import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
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

/**
 * @param {string=} userId ID of user who made the request
 */
export async function getBookRequests(userId) {
	const requests = [];
	const collectionRef = collection(firestore, "requests");

	const querySnapshot = userId != null
		? await getDocs(query(collectionRef, where('requester', '==', userId)))
		: await getDocs(collectionRef);

	querySnapshot.forEach((documentSnapshot) => {
		const data = documentSnapshot.data();

		requests.push({
			...data,
			id: documentSnapshot.id,
			requestedDate: data.requestedDate.toDate()
		});
	});

	return requests;
}
