import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export function NotFound() {
	return (
		<Stack
			justifyContent="center"
			alignItems="flex-start"
			margin="auto"
			padding={2}
			width="fit-content"
			minHeight="100vh">
			<Typography component="h1" variant="h4" fontWeight="bold" color="error">
				Error 404: Not Found
			</Typography>
			<Typography>Sorry, the page you are looking for does not exist.</Typography>
			<Button component={Link} to="/" variant="contained" sx={{ fontWeight: "bold" }}>
				Go back to homepage
			</Button>
		</Stack>
	);
}
