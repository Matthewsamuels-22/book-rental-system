import { useContext } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { BookContext } from "../contexts/BookContext";

export function BookTable() {
	const { books } = useContext(BookContext);

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Title</TableCell>
						<TableCell>Authors</TableCell>
						<TableCell>Edition</TableCell>
						<TableCell>Volume</TableCell>
						<TableCell>Publisher</TableCell>
						<TableCell>Year Published</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{books.map((book, index) => (
						<TableRow key={index}>
							<TableCell>{book.id}</TableCell>
							<TableCell>{book.title}</TableCell>
							<TableCell>{book.authors.join(", ")}</TableCell>
							<TableCell>{book.edition}</TableCell>
							<TableCell>{book.volume}</TableCell>
							<TableCell>{book.publisher}</TableCell>
							<TableCell>{book.yearPublished}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
