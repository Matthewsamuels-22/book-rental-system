import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { auth, firestore } from "../../firebase";


const labels = ["Students"];

export function BarChart() {
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "Students",
        data: [0],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(firestore, "users", auth.currentUser.uid, "students");
        const querySnapshot = await getDocs(collectionRef);
        const studentCount = querySnapshot.size;

        setData(prevData => ({
          ...prevData,
          datasets: [{
            ...prevData.datasets[0],
            data: [studentCount], 
          }]
        }));
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      }
    };

    fetchData();
  }, [auth]); 

  return <Bar data={data} />;
}
