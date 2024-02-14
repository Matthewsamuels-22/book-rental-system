import Chart from "chart.js/auto";
import { Fragment, useContext, useEffect, useMemo } from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

import { BorrowContext } from "../../contexts/BorrowContext";
import { StudentContext } from "../../contexts/StudentContext";
import { getBorrowEntries } from "../../helpers/firestore/borrows";
import { getStudents } from "../../helpers/firestore/students";
import { BarChart } from "./BarChart";
import { InfoChip } from "./InfoChip";
import { PieChart } from "./PieChart";

export function Dashboard() {
	const theme = useTheme();
	const { borrows, setBorrows } = useContext(BorrowContext);
	const { students, setStudents } = useContext(StudentContext);

	const unreturnedIds = useMemo(
		() => new Set(borrows.filter((x) => x.dateReturned === null).map((x) => x.borrower)),
		[borrows],
	);

	useEffect(() => {
		if (borrows.length === 0) {
			getBorrowEntries()
				.then((x) => setBorrows(x))
				.catch(console.error);
		}

		if (students.length === 0) {
			getStudents()
				.then((x) => setStudents(x))
				.catch(console.error);
		}
	}, []);

	useEffect(() => {
		Chart.defaults.font.size = theme.typography.fontSize;
		Chart.defaults.color = theme.palette.text.primary;
		Chart.defaults.borderColor = theme.palette.divider;
	}, [theme]);

	return (
		<Fragment>
			<Stack
				direction="row"
				justifyContent="space-evenly"
				flexWrap="wrap"
				marginBottom={4}
				spacing={2}
				useFlexGap>
				<InfoChip theme={theme} label="Student count" value={students.length} />
				<InfoChip
					theme={theme}
					label="Students with outstanding books"
					value={unreturnedIds.size}
				/>
			</Stack>
			<Stack
				direction="row"
				justifyContent="space-evenly"
				flexWrap="wrap"
				spacing={2}
				useFlexGap>
				<Container maxWidth="xs">
					<PieChart theme={theme} records={borrows} />
				</Container>
				<Container maxWidth="xs">
					<BarChart records={students} />
				</Container>
			</Stack>
		</Fragment>
	);
}
