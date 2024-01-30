import { signOut } from "firebase/auth";
import { useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";

import {
	FaBell,
	FaBookOpen,
	FaBorderAll,
	FaComment,
	FaFile,
	FaQuestion,
	FaSignOutAlt,
	FaUser,
} from "react-icons/fa";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { auth } from "../firebase";

export function Layout() {
	const { currentUserIsAdmin } = useOutletContext();

	if (currentUserIsAdmin) return <h1>404: Not found</h1>;

	const [tabIndex, setTabIndex] = useState(0);

	function handleTabChange(event, newTabIndex) {
		setTabIndex(newTabIndex);
	}

	return (
		<Stack direction="row">
			<div className="sidenav">
				<Button type="button" onClick={() => signOut(auth)} endIcon={<FaSignOutAlt />}>
					Sign Out
				</Button>
				<Divider variant="middle" />
				<Tabs orientation="vertical" value={tabIndex} onChange={handleTabChange}>
					<Tab
						component={Link}
						to="/"
						label="Dashboard"
						icon={<FaBorderAll />}
						iconPosition="start"
					/>
					<Tab
						component={Link}
						to="/account"
						label="Account"
						icon={<FaUser />}
						iconPosition="start"
					/>
					<Tab
						component={Link}
						to="/"
						label="Chat"
						icon={<FaComment />}
						iconPosition="start"
					/>
					<Tab
						component={Link}
						to="/"
						label="Messages"
						icon={<FaBell />}
						iconPosition="start"
					/>
					<Tab
						component={Link}
						to="/borrows"
						label="Borrows"
						icon={<FaBookOpen />}
						iconPosition="start"
					/>
					<Tab
						component={Link}
						to="/requests"
						label="Requests"
						icon={<FaQuestion />}
						iconPosition="start"
					/>
					<Tab
						component={Link}
						to="/books"
						label="Books"
						icon={<FaFile />}
						iconPosition="start"
					/>
				</Tabs>
			</div>
			<Container fixed>
				<Outlet />
			</Container>
		</Stack>
	);
}
