/* eslint-disable @next/next/no-img-element */
import "./AgentTable.scss"
import { useRouter } from 'next/navigation'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function AgentTable({ agents = [""] }) {
    const router = useRouter()

    return (
        <>
            <div className="agentTable_container">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Agent</TableCell>
                                <TableCell align="right">Numéro</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {agents.map((row) => (
                                <TableRow
                                    key="image"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    onClick={() => router.push(`/calls/${row}`)}
                                >
                                    <TableCell component="td" scope="row">
                                        <img src="/assets/icon/agent-icon.svg" alt="" />
                                    </TableCell>
                                    <TableCell align="right">{row}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}