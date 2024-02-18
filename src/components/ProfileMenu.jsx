import { signOut } from "firebase/auth";
import { Fragment, useState } from "react";
import { FaCaretDown, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";

import Button from "@mui/material/Button";
import MuiLink from "@mui/material/Link";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";

import { auth } from "../firebase";

export function ProfileMenu() {
	const { currentUserIsAdmin } = useOutletContext();
	const theme = useTheme();
	const [anchorElement, setAnchorElement] = useState(null);
	const open = anchorElement !== null;

	function handleClick(event) {
		setAnchorElement(event.currentTarget);
	}

	function handleClose() {
		setAnchorElement(null);
	}

	async function handleSignout() {
		setAnchorElement(null);
		await signOut(auth);
	}

	return (
		<Fragment>
			<Button
				id="profile-button"
				aria-controls={open ? "profile-menu" : undefined}
				aria-haspopup={true}
				aria-expanded={open}
				onClick={handleClick}
				endIcon={<FaCaretDown />}>
				{auth.currentUser.displayName ?? auth.currentUser.email}
			</Button>

			<Menu
				id="profile-menu"
				anchorEl={anchorElement}
				open={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				MenuListProps={{ "aria-labelledby": "profile-button" }}>
				<MenuItem divider sx={{ padding: 0 }}>
					<MuiLink
						component={Link}
						to={currentUserIsAdmin ? "/admin/account" : "/account"}
						onClick={handleClose}
						color="inherit"
						underline="none"
						paddingX={2}
						paddingY={0.75}>
						<ListItemIcon>
							<FaUser />
						</ListItemIcon>
						Account
					</MuiLink>
				</MenuItem>
				<MenuItem sx={{ padding: 0, color: theme.palette.error.main }}>
					<MuiLink
						component={Link}
						to="/auth/signin"
						onClick={handleSignout}
						color="inherit"
						underline="none"
						paddingX={2}
						paddingY={0.75}
						reloadDocument>
						<ListItemIcon sx={{ color: "inherit" }}>
							<FaSignOutAlt />
						</ListItemIcon>
						Sign out
					</MuiLink>
				</MenuItem>
			</Menu>
		</Fragment>
	);
}
