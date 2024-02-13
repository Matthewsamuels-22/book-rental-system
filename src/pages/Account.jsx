import { updatePassword, updateProfile, verifyBeforeUpdateEmail } from "firebase/auth";
import { Fragment, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { auth } from "../firebase";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const AuthErrorCodes = { REQUIRES_RECENT_LOGIN: "auth/requires-recent-login" };

/**
 * @param {string} text
 */
function getInitials(text) {
	return text.includes(" ")
		? text
				.split(" ")
				.map((x) => x[0])
				.join("")
		: text.substring(0, 6);
}

export function Account() {
	const currentUser = auth.currentUser;

	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const displayNameInputRef = useRef(null);
	const emailInputRef = useRef(null);
	const newPasswordInputRef = useRef(null);

	const [reauthenticated, setReauthenticated] = useState(
		searchParams.get("reauthenticated") === "true",
	);

	useDocumentTitle("Account");

	async function changeProfile() {
		await updateProfile(currentUser, { displayName: displayNameInputRef.current.value });
		window.alert("Profile was updated");
	}

	async function changeEmailAddress(event) {
		if (!reauthenticated) {
			navigate("/auth/reauthenticate");
			return;
		}

		try {
			await verifyBeforeUpdateEmail(currentUser, emailInputRef.current.value);
			window.alert("Email was updated");
		} catch (error) {
			if (error.code === AuthErrorCodes.REQUIRES_RECENT_LOGIN) {
				setReauthenticated(false);
				event.target.click();
			}
		}
	}

	async function changePassword(event) {
		if (!reauthenticated) {
			navigate("/auth/reauthenticate");
			return;
		}

		try {
			await updatePassword(currentUser, newPasswordInputRef.current.value);
			window.alert("Password was updated");
		} catch (error) {
			if (error.code === AuthErrorCodes.REQUIRES_RECENT_LOGIN) {
				setReauthenticated(false);
				event.target.click();
			}
		}
	}

	return (
		<Fragment>
			<Stack direction="row" flexWrap="wrap" marginTop={2} spacing={2} useFlexGap>
				<Avatar sx={{ width: 100, height: 100, textTransform: "uppercase" }}>
					{getInitials(currentUser.displayName ?? currentUser.email)}
				</Avatar>
				<Stack spacing={2}>
					<TextField
						label="Display name"
						defaultValue={currentUser.displayName}
						inputRef={displayNameInputRef}
					/>
					<Button
						variant="contained"
						onClick={changeProfile}
						sx={{ fontWeight: "bold", textTransform: "none" }}>
						Update
					</Button>
				</Stack>
			</Stack>

			<Stack marginTop={4} spacing={2}>
				<TextField
					type="email"
					label="Email"
					variant="filled"
					defaultValue={currentUser.email}
					inputRef={emailInputRef}
					required
				/>
				<Button
					variant="contained"
					onClick={changeEmailAddress}
					sx={{ fontWeight: "bold", textTransform: "none" }}>
					Update
				</Button>
			</Stack>

			<Stack marginTop={4} spacing={2}>
				<TextField
					type="password"
					label="New password"
					variant="filled"
					inputRef={newPasswordInputRef}
					inputProps={{ minLength: 6 }}
					required
				/>
				<Button
					variant="contained"
					onClick={changePassword}
					sx={{ fontWeight: "bold", textTransform: "none" }}>
					Update
				</Button>
			</Stack>
		</Fragment>
	);
}
