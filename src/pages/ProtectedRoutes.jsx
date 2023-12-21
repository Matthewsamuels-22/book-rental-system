import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"

import { auth } from "../../firebase"

export function ProtectedRoutes() {
  const navigate = useNavigate()
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user === null) {
        // user is not signed in
        navigate("/auth/signin")
        return
      }

      console.log(user);
      const loginTime = parseInt(user.metadata.lastLoginAt)

      if (Date.now() - loginTime <= 180000) {
        // user signed in ~3 minutes ago
        setSignedIn(true)
        return
      }

      const rememberMe = window.localStorage.getItem('rememberMe') === 'true'
      if (rememberMe) setSignedIn(true)
    });

    return unsubscribe;
  }, []);

  return signedIn ? <Outlet /> : null
}
