import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { auth } from "../firebase";

export function ProtectedRoutes() {
	const navigate = useNavigate();
	const [signedIn, setSignedIn] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user === null) {
				// user is not signed in
				navigate("/auth/signin");
				return;
			}

			const activeSession = window.sessionStorage.getItem("activeSession") === "true";

			if (activeSession) {
				setSignedIn(true);
				return;
			}

			const rememberMe = window.localStorage.getItem("rememberMe") === "true";

			if (rememberMe) {
				setSignedIn(true);
				return;
			}

			signOut(auth);
		});

		return unsubscribe;
	}, []);

	return signedIn ? <Outlet /> : null;
}
