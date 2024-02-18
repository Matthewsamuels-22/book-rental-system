import { deleteUser } from "firebase/auth";
import { collection, doc, getDoc, getDocs, writeBatch } from "firebase/firestore";
import { firestore } from "../../firebase";

/**
 * @param {string} uid
 */
export async function userIsAdmin(uid) {
	console.debug("userIsAdmin:", uid);
	const collectionRef = collection(firestore, "users");
	const documentSnapshot = await getDoc(doc(collectionRef, uid));
	return documentSnapshot.exists();
}

/**
 * @param {import("firebase/auth").User} user
 * @param {boolean} isAdmin
 */
export async function deleteUserAccount(user, isAdmin) {
	console.debug("deleteUserAccount:", user.uid, isAdmin);
	if (isAdmin) return;

	const batch = writeBatch(firestore);

	let collectionRef = collection(firestore, "users", user.uid, "students");
	const studentsQuerySnapshot = await getDocs(collectionRef);
	studentsQuerySnapshot.forEach((x) => batch.delete(x.ref));

	collectionRef = collection(firestore, "users", user.uid, "borrows");
	const borrowsQuerySnapshot = await getDocs(collectionRef);
	borrowsQuerySnapshot.forEach((x) => batch.delete(x.ref));

	collectionRef = collection(firestore, "users", user.uid, "books");
	const booksQuerySnapshot = await getDocs(collectionRef);
	booksQuerySnapshot.forEach((x) => batch.delete(x.ref));

	await batch.commit();
	await deleteUser(user);
}
