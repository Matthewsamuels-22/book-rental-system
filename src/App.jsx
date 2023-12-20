import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Signin } from './Components/LoginForm/SignIn';
import { Signup } from './Components/LoginForm/Signup';
import { Home } from './Components/Pages/Home';
import { ProtectedRoutes } from './Components/Pages/Protectedroutes';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth/signin' element={<Signin />} />
        <Route path='/auth/signup' element={<Signup />} />
        <Route element={<ProtectedRoutes />}        >
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
