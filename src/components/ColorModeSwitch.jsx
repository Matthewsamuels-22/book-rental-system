import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useContext } from "react";

import { ColorModeContext } from "../contexts/ColorModeContext";

export function ColorModeSwitch() {
	const colorMode = useContext(ColorModeContext)

	return (
		<FormControlLabel control={<Switch onChange={colorMode.toggle} defaultChecked={colorMode.isDark} />} label="Dark mode" />
	);
}