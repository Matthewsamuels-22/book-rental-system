import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export function Home() {
  return (
    <section>
      <h2>Homepage</h2>
      <button onClick={()=>signOut(auth)}>Sign Out</button>
    </section>
  );
}
