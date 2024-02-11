import { useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"

import { BookContext } from "./contexts/BookContext";
import { BorrowContext } from "./contexts/BorrowContext";
import { RequestContext } from "./contexts/RequestContext";
import { StudentContext } from "./contexts/StudentContext";
import { InventoryContext } from "./contexts/InventoryContext";
import { ColorModeContext } from "./contexts/ColorModeContext";
import { useColorMode } from "./hooks/useColorMode";

import { Account } from "./pages/Account";
import { Books } from "./pages/books/Books";
import { Borrows } from "./pages/borrows/Borrows";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { ProtectedRoutes } from "./pages/ProtectedRoutes";
import { Reauthenticate } from "./pages/auth/Reauthenticate";
import { ResetPassword } from "./pages/auth/ResetPassword";
import { Signin } from "./pages/auth/Signin";
import { Signup } from "./pages/auth/Signup";
import { Requests } from "./pages/requests/Requests";
import { Students } from "./pages/students/Students";
import { Inventory } from "./pages/inventory/Inventory";

import { Books as AdminBooks } from "./pages/admin/books/Books";
import { Layout as AdminLayout } from "./pages/admin/Layout";
import { Requests as AdminRequests } from "./pages/admin/requests/Requests";

import { NotFound } from "./pages/NotFound";
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
						<Route path="/requests" element={<Requests />} />
						<Route path="/students" element={<Students />} />
						<Route path="/inventory" element={<Inventory />} />
					</Route>
					<Route element={<AdminLayout />}>
						<Route path="/admin/account" element={<Account />} />
						<Route path="/admin/books" element={<AdminBooks />} />
						<Route path="/admin/requests" element={<AdminRequests />} />
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

function App() {
	const [books, setBooks] = useState([]);
	const [borrows, setBorrows] = useState([]);
	const [requests, setRequests] = useState([]);
	const [students, setStudents] = useState([])
	const [inventory, setInventory] = useState([])

	const colorMode = useColorMode()
	const theme = useMemo(() => createTheme({ palette: { mode: colorMode.mode } }), [colorMode.mode])

	return (
		<BookContext.Provider value={{ books, setBooks }}>
			<BorrowContext.Provider value={{ borrows, setBorrows }}>
				<RequestContext.Provider value={{ requests, setRequests }}>
					<StudentContext.Provider value={{ students, setStudents }}>
						<InventoryContext.Provider value={{ inventory, setInventory }}>
							<ColorModeContext.Provider value={colorMode}>
								<ThemeProvider theme={theme}>
									<CssBaseline />
									<AppRouter />
								</ThemeProvider>
							</ColorModeContext.Provider>
						</InventoryContext.Provider>
					</StudentContext.Provider>
				</RequestContext.Provider>
			</BorrowContext.Provider>
		</BookContext.Provider>
	);
}

export default App;
