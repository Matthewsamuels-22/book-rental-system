import { collection, doc, getDoc } from "firebase/firestore";
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
