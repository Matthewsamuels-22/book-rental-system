import { Pie } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
	labels: labels,
	datasets: [
		{
			label: "My First dataset",
			backgroundColor: "rgb(255, 99, 132)",
			borderColor: "rgb(255, 99, 132)",
			data: [0, 10, 5, 2, 20, 30, 45],
		},
	],
};

export function PieChart() {
	return <Pie data={data} />;
}

//const [data, setData] = useState([]);

	//useEffect(() => {
		//const fetchData = async () => {
			//try{
				//const snapshot = await db.collection("books").get();
				//const data = snapshot.docs.map((doc) => doc.data());
				//setData(data);
			//}catch(error){
				//console.log(error);
			//}	
		//};
		//fetchData();
	//}, []);