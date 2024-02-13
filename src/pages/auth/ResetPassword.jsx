import { sendPasswordResetEmail } from "firebase/auth";
import { useRef } from "react";
import { FaUser } from "react-icons/fa";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { auth } from "../../firebase";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export function ResetPassword() {
	const emailInputRef = useRef(null);

	useDocumentTitle("Reset password");

	async function handleResetPassword(event) {
		event.preventDefault();
		await sendPasswordResetEmail(auth, emailInputRef.current.value);
		alert("Password reset link sent to your email address");
	}

	return (
		<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<Stack component="form" onSubmit={handleResetPassword} spacing={2}>
				<Typography component="h1" variant="h4" fontWeight="bold">
					Reset password
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

				<Button type="submit" variant="contained">
					Send password reset email
				</Button>
			</Stack>
		</Box>
	);
}
