import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { BookContext, bookTestData } from "./contexts/BookContext";
import { BorrowContext, borrowTestData } from "./contexts/BorrowContext";

import { Books } from "./pages/Books";
import { Borrows } from "./pages/Borrows";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { ProtectedRoutes } from "./pages/ProtectedRoutes";
import { Signin } from "./pages/auth/Signin";
import { Signup } from "./pages/auth/Signup";

import './App.css'
import { Account } from './pages/Account';
import { Message } from './pages/Message';



function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth/signin' element={<Signin />} />
        <Route path='/auth/signup' element={<Signup />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/books' element={<Books />} />
            <Route path='/borrows' element={<Borrows />} />
            <Route path='/account' element={<Account />} />
            <Route path='/messages' element={<Message />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
	const [books, setBooks] = useState(bookTestData);
	const [borrows, setBorrows] = useState(borrowTestData);

	return (
		<BookContext.Provider value={{ books, setBooks }}>
			<BorrowContext.Provider value={{ borrows, setBorrows }}>
				<AppRouter />
			</BorrowContext.Provider>
		</BookContext.Provider>
	);
}

export default App;
