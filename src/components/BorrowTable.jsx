import { useContext } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { BorrowContext } from '../contexts/BorrowContext';
import { dateToIsoDateString } from '../utilities/dateformat';

export function BorrowTable() {
	const { borrows } = useContext(BorrowContext)

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Borrower</TableCell>
						<TableCell>Book</TableCell>
						<TableCell>Date Borrowed</TableCell>
						<TableCell>Date Returned</TableCell>
						<TableCell>Condition Borrowed</TableCell>
						<TableCell>Condition Returned</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{
					borrows.map((entry, index) => (
						<TableRow key={index}>
							<TableCell>{entry.id}</TableCell>
							<TableCell>{entry.borrower}</TableCell>
							<TableCell>{entry.book}</TableCell>
							<TableCell>{dateToIsoDateString(entry.dateBorrowed)}</TableCell>
							<TableCell>{dateToIsoDateString(entry.dateReturned)}</TableCell>
							<TableCell>{entry.conditionBorrowed}</TableCell>
							<TableCell>{entry.conditionReturned}</TableCell>
						</TableRow>
					))
				}</TableBody>
			</Table>
		</TableContainer>
	);
}