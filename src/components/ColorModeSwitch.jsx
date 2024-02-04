import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useContext, useEffect, useState } from "react";

import { ColorModeContext } from "../contexts/ColorModeContext";

export function ColorModeSwitch() {
	const colorMode = useContext(ColorModeContext)
	const [colorModeIsDark, setColorModeIsDark] = useState(false)

	useEffect(() => {
		setColorModeIsDark(colorMode.isDark)
	}, []);

	function changeColorMode() {
		setColorModeIsDark(!colorModeIsDark)
		colorMode.toggle()
	}

	return (
		<FormControlLabel control={<Switch onChange={changeColorMode} checked={colorModeIsDark} />} label="Dark mode" />
	);
}