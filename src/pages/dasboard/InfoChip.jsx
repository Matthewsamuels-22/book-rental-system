import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export function InfoChip(props) {
	return (
		<Stack
			direction="row"
			flexWrap="wrap"
			border="1px solid"
			borderColor={props.theme.palette.divider}
			borderRadius={props.theme.shape.borderRadius}
			textAlign="center"
			overflow="hidden"
			alignSelf="center"
			useFlexGap>
			<Box flexGrow={1} bgcolor={props.theme.palette.divider} padding={1} paddingLeft={1.5}>
				{props.label}
			</Box>
			<Box flexGrow={1} padding={1} paddingRight={1.5}>
				{props.value}
			</Box>
		</Stack>
	);
}

InfoChip.propTypes = {
	theme: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
};
