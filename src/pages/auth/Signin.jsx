import {
	browserSessionPersistence,
	setPersistence,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { auth } from "../../firebase";

export function Signin() {
	const navigate = useNavigate();

	const emailInputRef = useRef(null);
	const passwordInputRef = useRef(null);
	const [rememberMe, setRememberMe] = useState(false);

	useEffect(() => {
		const shouldRememberMe = window.localStorage.getItem("rememberMe") === "true";
		if (shouldRememberMe) setRememberMe(true);
	}, []);

	async function handleSignIn(event) {
		event.preventDefault();

		if (!rememberMe) {
			await setPersistence(auth, browserSessionPersistence);
		}

		const userCredential = await signInWithEmailAndPassword(
			auth,
			emailInputRef.current.value,
			passwordInputRef.current.value,
		);

		window.localStorage.setItem("rememberMe", rememberMe);
		console.log(userCredential);
		navigate("/");
	}

	return (
		<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<Stack component="form" onSubmit={handleSignIn} spacing={2}>
				<Typography component="h1" variant="h4" fontWeight="bold">
					Sign in
				</Typography>

				<TextField
					type="email"
					label="Email"
					autoComplete="username"
					required
					inputRef={emailInputRef}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<FaUser />
							</InputAdornment>
						),
					}}
				/>

				<TextField
					type="password"
					label="Password"
					autoComplete="current-password"
					required
					inputRef={passwordInputRef}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<FaLock />
							</InputAdornment>
						),
					}}
				/>

				<Stack direction="row" alignItems="center">
					<FormControlLabel
						label="Remember me"
						control={
							<Checkbox
								checked={rememberMe}
								onChange={() => setRememberMe(!rememberMe)}
							/>
						}
					/>
					<MuiLink component={Link} to="/auth/reset-password" underline="none">
						Forgot password?
					</MuiLink>
				</Stack>

				<Button type="submit" variant="contained">
					Sign in
				</Button>

				<div>
					Don't have an account?&nbsp;
					<MuiLink component={Link} to="/auth/signup" underline="none">
						Register
					</MuiLink>
				</div>
			</Stack>
		</Box>
	);
}
