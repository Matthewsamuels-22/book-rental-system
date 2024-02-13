import PropTypes from "prop-types";
import { FaBars } from "react-icons/fa";

import IconButton from "@mui/material/IconButton";

export function DrawerToggleButton(props) {
	if (props.hide) return null;

	return (
		<IconButton
			onClick={() => props.setOpenDrawer(!props.openDrawer)}
			aria-label="open sidebar"
			sx={{
				width: "fit-content",
				marginLeft: props.sx?.marginLeft,
				marginTop: props.sx?.marginTop,
			}}>
			<FaBars />
		</IconButton>
	);
}

DrawerToggleButton.propTypes = {
	hide: PropTypes.bool.isRequired,
	openDrawer: PropTypes.bool.isRequired,
	setOpenDrawer: PropTypes.func.isRequired,
	sx: PropTypes.exact({
		marginLeft: PropTypes.string,
		marginTop: PropTypes.string,
	}),
};
