/* eslint-disable @next/next/no-img-element */
import "./CallTable.scss"
import axios from "axios"
import { useState } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckNumber from "@/utils/CheckNumber";


export default function CallTable({ calls = [{
    from: "",
    formatedFrom: "",
    to: "",
    date: "",
    duration: 0,
    formatedDuration: 0,
    subject: "",
    formatedSubject: "",
    summary: "",
    id: ""
}] }) {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [showErrorPhone1, setShowErrorPhone1] = useState(false);
    const [showErrorPhone2, setShowErrorPhone2] = useState(false);
    const [selectedRow, setSelectedRow] = useState({ from: "", to: "", date: "", duration: "", formatedDuration: "", subject: "", formatedSubject: "", summary: "", id: "", formatedFrom: "" })
    const [selectedFrom, setSelectedFrom] = useState("");

    function displayModal1(call: any) {
        setShow(true);
        setShow2(false);
        setSelectedRow(call);
        setSelectedFrom(call.from);
    }

    function displayModal2() {
        setShow(false);
        setShow2(true);
    }

    function DisplayErrors() {
        selectedRow.from = CheckNumber(selectedRow.from);
        selectedRow.to = CheckNumber(selectedRow.to);
        console.log(selectedRow);
        if (selectedRow.from == "error") {
            setShowErrorPhone1(true);
            return "ko"
        } else {
            setShowErrorPhone1(false);
        }

        if (selectedRow.to == "error") {
            setShowErrorPhone2(true);
            return "ko"
        } else {
            setShowErrorPhone2(false);
        }
        return "ok"
    }

    function updateCall() {
        if (DisplayErrors() == "ok") {
            axios.patch(`http://localhost:8000/api/call/${selectedFrom}`, selectedRow)
                .then(function (res) {
                    location.reload()
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }
    function deleteCall() {
        axios.delete(`http://localhost:8000/api/call/${selectedFrom}`)
            .then(function (res) {
                location.reload()
            })
            .catch(function (error) {
                console.log(error)
            })
    }

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
                                    onClick={() => displayModal1(row)}
                                >
                                    <TableCell component="td" scope="row">
                                        {row.date}
                                    </TableCell>
                                    <TableCell>{row.formatedFrom}</TableCell>
                                    <TableCell>{row.formatedDuration}</TableCell>
                                    <TableCell style={{
                                        'color': row.formatedSubject === 'rendez-vous' ? '#2A9D8F'
                                            : row.formatedSubject === 'information' ? '#E9C46A'
                                                : row.formatedSubject === 'ordonnance' ? '#F4A261'
                                                    : row.formatedSubject === 'autre' ? '#E76F51' : 'white'
                                    }}>{row.formatedSubject}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {show ? <div className="modal_container">
                    <div className="call_modal" >
                        <div className="cross_container">
                            <img src="/assets/icon/cross-icon.png" alt="" onClick={() => setShow(false)} />
                        </div>
                        <div className="call_summary">
                            <h1>Résumé</h1>
                            <p>{selectedRow.summary}</p>
                        </div>
                        <div className="call_action">
                            <button className="green" onClick={() => displayModal2()}>Modifier</button>
                            <button className="red" onClick={() => deleteCall()}>Supprimer</button>
                        </div>
                    </div>
                </div> : null}

                {show2 ? <div className="modal_container">
                    <div className="update_modal" >
                        <div className="cross_container">
                            <img src="/assets/icon/cross-icon.png" alt="" onClick={() => setShow2(false)} />
                        </div>
                        <div className="update_call">
                            <h1>Modifier l&apos;appel</h1>
                            <div className="input_box">
                                <p>Numéro de l&apos;appelant</p>
                                <input type="text" placeholder={`${selectedRow.from}`} onChange={e => setSelectedRow({ ...selectedRow, from: e.target.value })} />
                                {showErrorPhone1 ? <p className="error">Format accepté : 0XXXXXXXXX, +33XXXXXXXXX, +33 XX XX XX XX, 0X XX XX XX XX</p> : null}
                            </div>
                            <div className="input_box">
                                <p>Numéro de l&apos;agent</p>
                                <input type="text" placeholder={`${selectedRow.to}`} onChange={e => setSelectedRow({ ...selectedRow, to: e.target.value })} />
                                {showErrorPhone2 ? <p className="error">Format accepté : 0XXXXXXXXX, +33XXXXXXXXX, +33 XX XX XX XX, 0X XX XX XX XX</p> : null}
                            </div>
                            <div className="input_box">
                                <p>Date de l&apos;appel</p>
                                <input type="datetime-local" placeholder={`${selectedRow.date}`} onChange={e => setSelectedRow({ ...selectedRow, date: e.target.value })} />
                            </div>
                            <div className="input_box">
                                <p>Durée de l&apos;appel (en secondes)</p>
                                <input type="number" placeholder={`${selectedRow.formatedDuration}`} onChange={e => setSelectedRow({ ...selectedRow, duration: e.target.value })} />
                            </div>
                            <div className="input_box">
                                <p>Sujet de l&apos;appel</p>
                                <select id="subject" onChange={e => setSelectedRow({ ...selectedRow, subject: e.target.value })}>
                                    <option value={selectedRow.subject}>Veuillez choisir une option</option>
                                    <option value="appointment">Rendez-vous</option>
                                    <option value="information">Information</option>
                                    <option value="prescription">Ordonnance</option>
                                    <option value="other">Autre</option>
                                </select>
                            </div>

                            <div className="input_box">
                                <p>Résumé de l&apos;appelant</p>
                                <textarea placeholder={`${selectedRow.summary}`} onChange={e => setSelectedRow({ ...selectedRow, summary: e.target.value })} rows={5} cols={33} />
                            </div>
                        </div>
                        <div className="call_action">
                            <button className="green" onClick={() => updateCall()}>Modifier</button>
                        </div>
                    </div>
                </div> : null}

            </div>
        </>
    )
}