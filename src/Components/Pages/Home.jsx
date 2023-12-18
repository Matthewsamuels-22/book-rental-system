import { signOut } from "firebase/auth" // Importing the signOut method from the auth module
import { auth } from "../../firebase" // Importing the auth module from the firebase configuration file

export const Home = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully")
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <section>
        <h2>Homepage</h2>
        <button onClick={handleSignOut}>Sign Out</button>
    </section>
  )
}
