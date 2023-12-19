import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { SignIn } from './Components/LoginForm/SignIn';
import { Signup } from './Components/LoginForm/Signup';
import { Home } from './Components/Pages/Home';
import { Protectedroutes } from './Components/Pages/Protectedroutes';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useEffect, useState } from 'react';


function App() {
  const [user, setUser] = useState(null);
  //Checking if the user is logged in or not
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        console.log('User is logged in');
      } else {
        setUser(null);
        setIsFetching(false);
      }
    });

    // Cleanup function to unsubscribe from the onAuthStateChanged listener
    return () => unsubscribe();
  }, []);

  if (isFetching) return <h1>Loading...</h1>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn user={user}/>} />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/home'
          element={
            <Protectedroutes user={user}>
              <Home />
            </Protectedroutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
