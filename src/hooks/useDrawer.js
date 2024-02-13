import { useEffect, useState } from "react";

export function useDrawer(theme) {
	const [drawerProps, setDrawerProps] = useState(null);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [hideDrawerToggle, setHideDrawerToggle] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < theme.breakpoints.values.md) {
				setDrawerProps(null);
				setDrawerOpen(false);
				setHideDrawerToggle(false);
				return;
			}

			setDrawerOpen(true);
			setHideDrawerToggle(true);
			setDrawerProps({
				variant: "permanent",
				PaperProps: { sx: { position: "relative", borderRight: "none" } },
			});
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return { drawerProps, drawerOpen, setDrawerOpen, hideDrawerToggle };
}
