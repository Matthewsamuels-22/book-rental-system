import { useContext } from "react";
import { RequestContext } from "../contexts/RequestContext";
import  TableContainer  from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import { dateToIsoDateString } from "../utilities/dateformat";

export function RequestTable() {
    const { requests } = useContext(RequestContext);
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Requester</TableCell>
                        <TableCell>Book</TableCell>
                        <TableCell>Date Requested</TableCell>
                        <TableCell>Amount Requested</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {requests.map((entry, index) => (
                        <TableRow key={index}>
                            <TableCell>{entry.id}</TableCell>
                            <TableCell>{entry.requester}</TableCell>
                            <TableCell>{entry.book}</TableCell>
                            <TableCell>{dateToIsoDateString(entry.dateRequested)}</TableCell>
                            <TableCell>{entry.amountRequested}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}