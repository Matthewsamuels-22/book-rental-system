import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

export function BarChart(props) {
	const [gradeCount, setGradeCount] = useState({});

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
		props.records.forEach((student) => {
			const grade = student.gradeLevels.at(-1).grade;
			if (!(grade in gradeCount)) gradeCount[grade] = 0;
			gradeCount[grade]++;
		});

		setGradeCount({ ...gradeCount });
	}, [props.records]);

	return (
		<Bar data={data} options={{ plugins: { title: { display: true, text: "Students" } } }} />
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
