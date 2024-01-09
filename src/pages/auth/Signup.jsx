import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRef } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { auth } from "../../firebase";

export function Signup() {
	const navigate = useNavigate();
	const emailInputRef = useRef(null);
	const passwordInputRef = useRef(null);

	async function handleSignUp(event) {
		event.preventDefault();

		const userCredential = await createUserWithEmailAndPassword(
			auth,
			emailInputRef.current.value,
			passwordInputRef.current.value,
		);

		window.sessionStorage.setItem("activeSession", true);
		console.log(userCredential);
		navigate("/");
	}

	return (
		<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<Stack component="form" onSubmit={handleSignUp} spacing={2}>
				<Typography component="h1" variant="h4" fontWeight="bold">
					Sign up
				</Typography>

				<TextField
					type="email"
					label="Email"
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
					minLength={6}
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

				<Button type="submit" variant="contained">
					Create account
				</Button>

				<div>
					Already have an account?&nbsp;
					<MuiLink component={Link} to="/auth/signin" underline="none">
						Sign in
					</MuiLink>
				</div>
			</Stack>
		</Box>
	);
}
