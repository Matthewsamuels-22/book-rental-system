import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

export function PieChart(props) {
	const [borrowCount, setBorrowCount] = useState(0);

	const data = {
		labels: ["Borrowed", "Returned"],
		datasets: [
			{
				label: "Books",
				data: [borrowCount, props.records.length - borrowCount],
				borderColor: props.theme.palette.background.default,
			},
		],
	};

	useEffect(() => {
		const count = props.records.filter((x) => x.dateReturned === null).length;
		setBorrowCount(count);
	}, [props.records]);

	return (
		<Pie
			data={data}
			options={{
				plugins: {
					title: { display: true, text: "Books Borrowed and Returned" },
					colors: { forceOverride: true },
				},
			}}
		/>
	);
}

PieChart.propTypes = {
	theme: PropTypes.object.isRequired,
	records: PropTypes.arrayOf(
		PropTypes.exact({
			id: PropTypes.string.isRequired,
			borrower: PropTypes.string.isRequired,
			book: PropTypes.string.isRequired,
			dateBorrowed: PropTypes.instanceOf(Date).isRequired,
			dateReturned: PropTypes.instanceOf(Date),
			conditionBorrowed: PropTypes.string.isRequired,
			conditionReturned: PropTypes.string,
		}).isRequired,
	).isRequired,
};
