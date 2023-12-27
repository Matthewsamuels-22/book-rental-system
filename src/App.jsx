import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Signin } from './pages/auth/Signin';
import { Signup } from './pages/auth/Signup';
import { Home } from './pages/Home';
import { Layout } from "./pages/Layout";
import { ProtectedRoutes } from './pages/ProtectedRoutes';

import './App.css'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth/signin' element={<Signin />} />
        <Route path='/auth/signup' element={<Signup />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
