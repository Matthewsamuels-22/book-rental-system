import PropTypes from "prop-types";
import { useContext, useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";

import { ColorModeContext } from "../../contexts/ColorModeContext";

import { ColorModeContext } from "../../contexts/ColorModeContext";

export function BarChart(props) {
	const colorMode = useContext(ColorModeContext);
	const [gradeCount, setGradeCount] = useState({});

	const uuid = useMemo(() => window.crypto.randomUUID(), [colorMode.isDark]);

	const entries = Object.entries(gradeCount);
	const data = {
		labels: entries.map((x) => "Grade " + x[0]),
		datasets: [
			{
				label: "Total",
				data: entries.map((x) => x[1]),
				borderWidth: 1,
			},
		],
	};

	useEffect(() => {
		const newGradeCount = {};

		props.records.forEach((student) => {
			const grade = student.gradeLevels.at(-1).grade;
			if (!(grade in newGradeCount)) newGradeCount[grade] = 0;
			newGradeCount[grade]++;
		});

		setGradeCount(newGradeCount);
	}, [props.records]);

	return (
		<Bar
			key={uuid}
			data={data}
			options={{ plugins: { title: { display: true, text: "Students" } } }}
		/>
	);
}

BarChart.propTypes = {
	records: PropTypes.arrayOf(
		PropTypes.exact({
			id: PropTypes.string.isRequired,
			schoolId: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			gradeLevels: PropTypes.arrayOf(
				PropTypes.exact({
					grade: PropTypes.number.isRequired,
					class: PropTypes.string.isRequired,
					logDate: PropTypes.instanceOf(Date).isRequired,
				}).isRequired,
			).isRequired,
		}).isRequired,
	).isRequired,
};
