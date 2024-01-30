import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import { userIsAdmin } from "../helpers/firestore/users";

export function ProtectedRoutes() {
	const navigate = useNavigate();
	const [isAdmin, setIsAdmin] = useState(false);
	const [signedIn, setSignedIn] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user === null) {
				// user is not signed in
				navigate("/auth/signin");
				return;
			}

			setIsAdmin(await userIsAdmin(user.uid));
			setSignedIn(true);
		});

		return unsubscribe;
	}, []);

	return signedIn ? <Outlet context={{ currentUserIsAdmin: isAdmin }} /> : null;
}
