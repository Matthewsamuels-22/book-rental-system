import { signOut } from "firebase/auth";
import { useState } from "react";
import { Link, Outlet } from 'react-router-dom';

import {
	FaBorderAll,
	FaUser,
	FaComment,
	FaBell,
	FaBookOpen,
	FaQuestion,
	FaFile,
	FaSignOutAlt
} from "react-icons/fa";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from '@mui/material/Stack';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { auth } from '../firebase';



export function Layout() {
	const [tabIndex, setTabIndex] = useState(0)

	function handleTabChange(event, newTabIndex) {
		setTabIndex(newTabIndex)
	}

	return (
		<Stack direction='row'>
			<div className="sidenav">
				<Button
					type='button'
					onClick={() => signOut(auth)}
					endIcon={<FaSignOutAlt />}>
					Sign Out
				</Button>
				<Divider variant="middle" />
				<Tabs
					orientation='vertical'
					value={tabIndex}
					onChange={handleTabChange}>
					<Tab
						component={Link}
						to="/"
						label='Dashboard'
						icon={<FaBorderAll />}
						iconPosition='start' />
					<Tab
						component={Link}
						to="/"
						label='User'
						icon={<FaUser />}
						iconPosition='start' />
					<Tab
						component={Link}
						to="/"
						label='Chat'
						icon={<FaComment />}
						iconPosition='start' />
					<Tab
						component={Link}
						to="/"
						label='Messages'
						icon={<FaBell />}
						iconPosition='start' />
					<Tab
						component={Link}
						to="/borrows"
						label='Rentals'
						icon={<FaBookOpen />}
						iconPosition='start' />
					<Tab
						component={Link}
						to="/"
						label='Requests'
						icon={<FaQuestion />}
						iconPosition='start' />
					<Tab
						component={Link}
						to="/books"
						label='Files'
						icon={<FaFile />}
						iconPosition='start' />
				</Tabs>
			</div>
			<Container fixed><Outlet /></Container>
		</Stack>
	);
}