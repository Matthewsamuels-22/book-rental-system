import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { BookContext } from "./contexts/BookContext";
import { BorrowContext, borrowTestData } from "./contexts/BorrowContext";
import { RequestContext, requestTestData } from "./contexts/RequestContext";

import { Account } from "./pages/Account";
import { Books } from "./pages/Books";
import { Borrows } from "./pages/Borrows";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { ProtectedRoutes } from "./pages/ProtectedRoutes";
import { Reauthenticate } from "./pages/auth/Reauthenticate";
import { ResetPassword } from "./pages/auth/ResetPassword";
import { Signin } from "./pages/auth/Signin";
import { Signup } from "./pages/auth/Signup";
import { Request } from "./pages/Request";

import { Books as AdminBooks } from "./pages/admin/books/Books";
import { Layout as AdminLayout } from "./pages/admin/Layout";

import "./App.css";

function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/auth/signin" element={<Signin />} />
				<Route path="/auth/signup" element={<Signup />} />
				<Route path="/auth/reset-password" element={<ResetPassword />} />
				<Route element={<ProtectedRoutes />}>
					<Route path="/auth/reauthenticate" element={<Reauthenticate />} />
					<Route element={<Layout />}>
						<Route path="/" element={<Home />} />
						<Route path="/books" element={<Books />} />
						<Route path="/borrows" element={<Borrows />} />
						<Route path="/account" element={<Account />} />
						<Route path="/requests" element={<Request />} />
					</Route>
					<Route element={<AdminLayout />}>
						<Route path="/admin/account" element={<Account />} />
						<Route path="/admin/books" element={<AdminBooks />} />
						<Route path="/admin/requests" element={<AdminBooks />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

function App() {
	const [books, setBooks] = useState([]);
	const [borrows, setBorrows] = useState(borrowTestData);
	const [requests, setRequests] = useState(requestTestData);

	return (
		<BookContext.Provider value={{ books, setBooks }}>
			<BorrowContext.Provider value={{ borrows, setBorrows }}>
				<RequestContext.Provider value={{ requests, setRequests }}>
					<AppRouter />
				</RequestContext.Provider>
			</BorrowContext.Provider>
		</BookContext.Provider>
	);
}

export default App;
