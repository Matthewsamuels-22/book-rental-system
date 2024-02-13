import { Fragment, useEffect, useState } from "react";
import { FaBook, FaBoxes, FaChartPie, FaQuestion, FaRegListAlt, FaUsers } from "react-icons/fa";
import { Link, Navigate, Outlet, useOutletContext } from "react-router-dom";

import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";

import { DrawerToggleButton } from "../components/DrawerToggleButton";
import { Header } from "../components/Header";
import { useDrawer } from "../hooks/useDrawer";

export function Layout() {
	const { currentUserIsAdmin } = useOutletContext();

	if (currentUserIsAdmin) {
		return <Navigate to="/notfound" />;
	}

	const theme = useTheme();
	const [tabIndex, setTabIndex] = useState(0);
	const { drawerProps, drawerOpen, setDrawerOpen, hideDrawerToggle } = useDrawer(theme);

	useEffect(() => {
		const tabs = document.getElementsByClassName("MuiTab-root");
		const selectedTabIndex = Array.prototype.findIndex.call(
			tabs,
			(x) => x.href === window.location.href,
		);
		setTabIndex(selectedTabIndex >= 0 ? selectedTabIndex : false);
		setDrawerOpen(false);
	}, [window.location.href]);

	return (
		<Fragment>
			<Header
				hideDrawerToggleButton={hideDrawerToggle}
				openDrawer={drawerOpen}
				setOpenDrawer={setDrawerOpen}
			/>
			<Stack direction="row">
				<Drawer
					{...drawerProps}
					open={drawerOpen}
					ModalProps={{ keepMounted: true, disablePortal: true }}>
					<DrawerToggleButton
						hide={hideDrawerToggle}
						openDrawer={drawerOpen}
						setOpenDrawer={setDrawerOpen}
						sx={{ marginLeft: theme.spacing(0.5), marginTop: theme.spacing(2) }}
					/>
					<Tabs
						orientation="vertical"
						value={tabIndex}
						role="navigation"
						sx={{
							"& .MuiTabs-flexContainerVertical": { gap: theme.spacing(2) },
							"& .MuiTab-root": {
								minHeight: "auto",
								fontWeight: "bold",
								textTransform: "none",
								justifyContent: "flex-start",
							},
						}}>
						<Tab
							component={Link}
							to="/"
							label="Dashboard"
							icon={<FaChartPie />}
							iconPosition="start"
						/>
						<Tab
							component={Link}
							to="/inventory"
							label="Inventory"
							icon={<FaBoxes />}
							iconPosition="start"
						/>
						<Tab
							component={Link}
							to="/students"
							label="Students"
							icon={<FaUsers />}
							iconPosition="start"
						/>
						<Tab
							component={Link}
							to="/borrows"
							label="Borrows"
							icon={<FaRegListAlt />}
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
							icon={<FaBook />}
							iconPosition="start"
						/>
					</Tabs>
				</Drawer>
				<Container maxWidth="xl">
					<Outlet />
				</Container>
			</Stack>
		</Fragment>
	);
}
