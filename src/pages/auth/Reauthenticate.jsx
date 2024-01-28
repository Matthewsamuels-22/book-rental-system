import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useRef } from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { auth } from "../../firebase";

export function Reauthenticate() {
	const navigate = useNavigate();
	const passwordInputRef = useRef(null);

	async function handleReauthentication(event) {
		event.preventDefault();

		const currentUser = auth.currentUser;
		const credential = EmailAuthProvider.credential(
			currentUser.email,
			passwordInputRef.current.value,
		);
		await reauthenticateWithCredential(currentUser, credential);
		navigate("/account?reauthenticated=true");
	}

	return (
		<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<Stack component="form" onSubmit={handleReauthentication} spacing={2}>
				<Typography component="h1" variant="h4" fontWeight="bold">
					Reauthenticate
				</Typography>

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

				<Button type="submit" variant="contained">
					Reauthenticate
				</Button>
			</Stack>
		</Box>
	);
}
