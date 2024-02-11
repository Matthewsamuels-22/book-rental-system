import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";

/**
 * @param {string} docId
 */
export async function deleteStudent(docId) {
	console.debug("deleteStudent:", docId);
	const collectionRef = collection(firestore, "users", auth.currentUser.uid, "students");
	await deleteDoc(doc(collectionRef, docId));
}

/**
 * @param {string} docId
 * @param {object} data
 */
export async function updateStudent(docId, data) {
	console.debug("updateStudent:", docId, data);
	const collectionRef = collection(firestore, "users", auth.currentUser.uid, "students");
	await updateDoc(doc(collectionRef, docId), data);
}

/**
 * @param {object} data
 */
export async function addStudent(data) {
	console.debug("addStudent:", data);
	const collectionRef = collection(firestore, "users", auth.currentUser.uid, "students");
	const documentRef = await addDoc(collectionRef, data);
	return documentRef.id;
}

export async function getStudents() {
	const students = [];
	const collectionRef = collection(firestore, "users", auth.currentUser.uid, "students");
	const querySnapshot = await getDocs(collectionRef);

	querySnapshot.forEach((documentSnapshot) => {
		const data = documentSnapshot.data();

		students.push({
			...data,
			id: documentSnapshot.id,
			gradeLevels: data.gradeLevels.map((x) => ({ ...x, logDate: x.logDate.toDate() })),
		});
	});

	return students;
}
