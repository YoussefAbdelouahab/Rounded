/* eslint-disable @next/next/no-img-element */
import "./CallTable.scss"
import { useEffect } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function CallTable({ calls = [{
    from: "",
    to: "",
    date: "",
    duration: 0,
    subject: "",
    summary: "",
    id: ""
}] }) {

    return (
        <>
            <div className="calls_container">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Appelant</TableCell>
                                <TableCell>Durée</TableCell>
                                <TableCell>Motif</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {calls.map((row) => (
                                <TableRow
                                    key={row.date}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    onClick={() => console.log("ok")}
                                >
                                    <TableCell component="td" scope="row">
                                        {row.date}
                                    </TableCell>
                                    <TableCell>{row.from}</TableCell>
                                    <TableCell>{row.duration}</TableCell>
                                    <TableCell style={{
                                        'color': row.subject === 'rendez-vous' ? 'orange'
                                            : row.subject === 'information' ? 'violet'
                                                : row.subject === 'ordonnance' ? 'lightblue'
                                                    : row.subject === 'autre' ? 'yellow' : 'white'
                                    }}>{row.subject}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}