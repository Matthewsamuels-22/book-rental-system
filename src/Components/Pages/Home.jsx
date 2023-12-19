import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

export const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        navigate("/"); // Use navigate function to redirect the user to the login page after signing out
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section>
      <h2>Homepage</h2>
      <button onClick={handleSignOut}>Sign Out</button>
    </section>
  );
};
