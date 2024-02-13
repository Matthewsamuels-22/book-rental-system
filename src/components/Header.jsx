import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ColorModeSwitch } from "./ColorModeSwitch";
import { DrawerToggleButton } from "./DrawerToggleButton";
import { ProfileMenu } from "./ProfileMenu";

export function Header(props) {
	return (
		<Stack direction="row" flexWrap="wrap" padding={2} spacing={2} useFlexGap>
			<DrawerToggleButton
				hide={props.hideDrawerToggleButton}
				openDrawer={props.openDrawer}
				setOpenDrawer={props.setOpenDrawer}
			/>
			<Typography component="h1" variant="h6" marginRight="auto">
				{import.meta.env.VITE_APP_TITLE}
			</Typography>
			<ColorModeSwitch />
			<ProfileMenu />
		</Stack>
	);
}

Header.propTypes = {
	hideDrawerToggleButton: PropTypes.bool.isRequired,
	openDrawer: PropTypes.bool.isRequired,
	setOpenDrawer: PropTypes.func.isRequired,
};
