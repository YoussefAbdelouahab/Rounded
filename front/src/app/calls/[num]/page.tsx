/* eslint-disable @next/next/no-img-element */
"use client"
import Sidebar from "@/components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import axios from 'axios';
import "./calls.scss"

import CallTable from "@/components/Table/CallTable/CallTable";
import TranslateSubject from "@/utils/TranslateSubject";
import FromatDate from "@/utils/FormatDate";
import ConvertDuration from "@/utils/ConvertDuration";
import ConvertNumber from "@/utils/ConvertNumber";

import { BarChart, BarPlot } from '@mui/x-charts/BarChart';
import { useRouter } from "next/navigation";
import { ChartContainer } from "@mui/x-charts";


export default function Calls() {
    const [agentNumber, setAgenNumber] = useState("");
    const [checkedrdv, setCheckedRdv] = useState(false);
    const [checkedordonnance, setCheckedOrdonnance] = useState(false);
    const [checkedinformation, setCheckedInformation] = useState(false);
    const [checkedother, setCheckedOther] = useState(false);
    const [calls, setCalls] = useState([
        {
            from: "",
            to: "",
            date: "",
            duration: 0,
            subject: "",
            formatedSubject: "",
            summary: "",
            id: "",
            formatedFrom: "",
            formatedDuration: 0,
        }
    ])
    const [stats, setStats] = useState({
        AverageDuration: {
            result: ""
        },
        DifferentFrom: {
            nums: [],
            result: 0
        },
        MostFrequentSubject: {
            frequency: {
                appointment: 0,
                information: 0,
                prescription: 0,
                other: 0
            },
            result: ""
        },
        AverageTimeSaved: [
            {
                day: "",
                timeSaved: 0
            },
        ]
    })
    const [dayStats, setDayStats] = useState<any[]>([])
    const [timeStats, setTimeStats] = useState<any[]>([])
    const router = useRouter()

    async function refreshCalls() {
        await axios.get(`http://localhost:8000/api/calls/${new URL(window.location.href).pathname.split('/')[2]}`)
            .then((res) => {
                if (res.data.calls.length == 0) {
                    router.push("/");
                }
                res.data.calls.forEach((element: { subject: string, date: string, duration: any, formatedDuration: any, formatedSubject: string, from: string, formatedFrom: string }) => {
                    element.formatedSubject = TranslateSubject(element.subject)
                    element.date = FromatDate(element.date);
                    element.formatedDuration = ConvertDuration(element.duration);
                    element.formatedFrom = ConvertNumber(element.from)
                });
                setCalls(res.data.calls);
                res.data.statistics.AverageDuration.result = ConvertDuration(res.data.statistics.AverageDuration.result)
                res.data.statistics.MostFrequentSubject.result = TranslateSubject(res.data.statistics.MostFrequentSubject.result)
                setStats(res.data.statistics);

                res.data.statistics.AverageTimeSaved.forEach((element: any) => {
                    setDayStats(dayStats => [...dayStats, element.day]);
                    setTimeStats(timeStats => [...timeStats, element.timeSaved ]);
                });

                setAgenNumber(new URL(window.location.href).pathname.split('/')[2])
            })
        if(checkedrdv){
            setCheckedRdv(false);
            var rdv = document.getElementById("rdv") as HTMLInputElement;
            rdv.checked = false;
        } 
        if(checkedinformation){
            setCheckedInformation(false);
            var information = document.getElementById("information") as HTMLInputElement;
            information.checked = false;
        } 
        if(checkedordonnance){
            setCheckedOrdonnance(false);
            var ordonnance = document.getElementById("Ordonnance") as HTMLInputElement;
            ordonnance.checked = false;
        } 
        if(checkedother){
            setCheckedOther(false);
            var other = document.getElementById("other") as HTMLInputElement;
            other.checked = false;
        } 

    }

    function refreshButton() {
        document.getElementById("refresh_button")!.classList.add("rotate");
        refreshCalls();
        setTimeout(() => {
            document.getElementById("refresh_button")!.classList.remove("rotate");
        }, 1000);
    }

    function ApplyFilter(checkid: string) {
        if (checkid == "rdv") {
            setCheckedRdv(!checkedrdv)
            setCheckedOrdonnance(false);
            setCheckedInformation(false);
            setCheckedOther(false);
            var ordonnance = document.getElementById("Ordonnance") as HTMLInputElement;
            ordonnance.checked = false;
            var information = document.getElementById("information") as HTMLInputElement;
            information.checked = false;
            var other = document.getElementById("other") as HTMLInputElement;
            other.checked = false;

            if (!checkedrdv) {
                var FilteredCalls: any[] = []
                axios.get(`http://localhost:8000/api/calls/${new URL(window.location.href).pathname.split('/')[2]}`)
                    .then((res) => {
                        res.data.calls.forEach((element: { subject: string }) => {
                            if (element.subject == "appointment") {
                                FilteredCalls.push(element)
                            }
                        });

                        FilteredCalls.forEach((element: { subject: string, date: string, duration: any, formatedDuration: any, formatedSubject: string, from: string, formatedFrom: string }) => {
                            element.formatedSubject = TranslateSubject(element.subject)
                            element.date = FromatDate(element.date);
                            element.formatedDuration = ConvertDuration(element.duration);
                            element.formatedFrom = ConvertNumber(element.from)
                        });
                        setCalls(FilteredCalls);
                    })
            } else {
                axios.get(`http://localhost:8000/api/calls/${new URL(window.location.href).pathname.split('/')[2]}`)
                    .then((res) => {
                        res.data.calls.forEach((element: { subject: string, date: string, duration: any, formatedDuration: any, formatedSubject: string, from: string, formatedFrom: string }) => {
                            element.formatedSubject = TranslateSubject(element.subject)
                            element.date = FromatDate(element.date);
                            element.formatedDuration = ConvertDuration(element.duration);
                            element.formatedFrom = ConvertNumber(element.from)
                        });
                        setCalls(res.data.calls);
                    })
            }
        } else if (checkid == "ordonnance") {
            setCheckedOrdonnance(!checkedordonnance)
            setCheckedRdv(false);
            setCheckedInformation(false);
            setCheckedOther(false);
            var rdv = document.getElementById("rdv") as HTMLInputElement;
            rdv.checked = false;
            var information = document.getElementById("information") as HTMLInputElement;
            information.checked = false;
            var other = document.getElementById("other") as HTMLInputElement;
            other.checked = false;
            if (!checkedordonnance) {
                var FilteredCalls: any[] = []
                axios.get(`http://localhost:8000/api/calls/${new URL(window.location.href).pathname.split('/')[2]}`)
                    .then((res) => {
                        res.data.calls.forEach((element: { subject: string }) => {
                            if (element.subject == "prescription") {
                                FilteredCalls.push(element)
                            }
                        });

                        FilteredCalls.forEach((element: { subject: string, date: string, duration: any, formatedDuration: any, formatedSubject: string, from: string, formatedFrom: string }) => {
                            element.formatedSubject = TranslateSubject(element.subject)
                            element.date = FromatDate(element.date);
                            element.formatedDuration = ConvertDuration(element.duration);
                            element.formatedFrom = ConvertNumber(element.from)
                        });
                        setCalls(FilteredCalls);
                    })
            } else {
                axios.get(`http://localhost:8000/api/calls/${new URL(window.location.href).pathname.split('/')[2]}`)
                    .then((res) => {
                        res.data.calls.forEach((element: { subject: string, date: string, duration: any, formatedDuration: any, formatedSubject: string, from: string, formatedFrom: string }) => {
                            element.formatedSubject = TranslateSubject(element.subject)
                            element.date = FromatDate(element.date);
                            element.formatedDuration = ConvertDuration(element.duration);
                            element.formatedFrom = ConvertNumber(element.from)
                        });
                        setCalls(res.data.calls);
                    })
            }
        } else if (checkid == "information") {
            setCheckedInformation(!checkedinformation)
            setCheckedRdv(false)
            setCheckedOrdonnance(false)
            setCheckedOther(false)
            var rdv = document.getElementById("rdv") as HTMLInputElement;
            rdv.checked = false;
            var ordonnance = document.getElementById("Ordonnance") as HTMLInputElement;
            ordonnance.checked = false;
            var other = document.getElementById("other") as HTMLInputElement;
            other.checked = false;
            if (!checkedinformation) {
                var FilteredCalls: any[] = []
                axios.get(`http://localhost:8000/api/calls/${new URL(window.location.href).pathname.split('/')[2]}`)
                    .then((res) => {
                        res.data.calls.forEach((element: { subject: string }) => {
                            if (element.subject == "information") {
                                FilteredCalls.push(element)
                            }
                        });

                        FilteredCalls.forEach((element: { subject: string, date: string, duration: any, formatedDuration: any, formatedSubject: string, from: string, formatedFrom: string }) => {
                            element.formatedSubject = TranslateSubject(element.subject)
                            element.date = FromatDate(element.date);
                            element.formatedDuration = ConvertDuration(element.duration);
                            element.formatedFrom = ConvertNumber(element.from)
                        });
                        setCalls(FilteredCalls);
                    })
            } else {
                axios.get(`http://localhost:8000/api/calls/${new URL(window.location.href).pathname.split('/')[2]}`)
                    .then((res) => {
                        res.data.calls.forEach((element: { subject: string, date: string, duration: any, formatedDuration: any, formatedSubject: string, from: string, formatedFrom: string }) => {
                            element.formatedSubject = TranslateSubject(element.subject)
                            element.date = FromatDate(element.date);
                            element.formatedDuration = ConvertDuration(element.duration);
                            element.formatedFrom = ConvertNumber(element.from)
                        });
                        setCalls(res.data.calls);
                    })
            }
        } else if (checkid == "other") {
            setCheckedOther(!checkedother)
            setCheckedRdv(false)
            setCheckedOrdonnance(false)
            setCheckedInformation(false)
            var rdv = document.getElementById("rdv") as HTMLInputElement;
            rdv.checked = false;
            var ordonnance = document.getElementById("Ordonnance") as HTMLInputElement;
            ordonnance.checked = false;
            var rdv = document.getElementById("rdv") as HTMLInputElement;
            rdv.checked = false;
            if (!checkedother) {
                var FilteredCalls: any[] = []
                axios.get(`http://localhost:8000/api/calls/${new URL(window.location.href).pathname.split('/')[2]}`)
                    .then((res) => {
                        res.data.calls.forEach((element: { subject: string }) => {
                            if (element.subject == "other") {
                                FilteredCalls.push(element)
                            }
                        });

                        FilteredCalls.forEach((element: { subject: string, date: string, duration: any, formatedDuration: any, formatedSubject: string, from: string, formatedFrom: string }) => {
                            element.formatedSubject = TranslateSubject(element.subject)
                            element.date = FromatDate(element.date);
                            element.formatedDuration = ConvertDuration(element.duration);
                            element.formatedFrom = ConvertNumber(element.from)
                        });
                        setCalls(FilteredCalls);
                    })
            } else {
                axios.get(`http://localhost:8000/api/calls/${new URL(window.location.href).pathname.split('/')[2]}`)
                    .then((res) => {
                        res.data.calls.forEach((element: { subject: string, date: string, duration: any, formatedDuration: any, formatedSubject: string, from: string, formatedFrom: string }) => {
                            element.formatedSubject = TranslateSubject(element.subject)
                            element.date = FromatDate(element.date);
                            element.formatedDuration = ConvertDuration(element.duration);
                            element.formatedFrom = ConvertNumber(element.from)
                        });
                        setCalls(res.data.calls);
                    })
            }
        }

    }
    useEffect(() => {
        
        if (typeof window !== 'undefined') {
            try {
                
                refreshCalls();
                setDayStats(dayStats.filter(a => a));
                setTimeStats(timeStats.filter(a => a));
            } catch (error) {
                console.log(error)
            }
        }
    }, [])

    return (
        <div className="page">
            <Sidebar page="dashboard" AgentNumber={`${agentNumber}`} />
            <div className="dashboard_content">

                <div className="first_line">
                    <div className="agent_container">
                        <div className="agent_data">
                            <h1>Agent numéro</h1>
                            <p>{agentNumber}</p>
                            <p></p>
                        </div>
                        <div className="agent_image">
                            <img src="/assets/man.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="right_container">
                        <div className="stats_container">
                            <div className="data">
                                <div className="stat_title">
                                    <p className="p_title">Durée moyenne des appels</p>
                                    <hr />
                                </div>
                                <div className="stat_data">
                                    <img src="/assets/icon/clock-icon.svg" alt="" />
                                    <p>{stats.AverageDuration.result}</p>
                                </div>
                            </div>
                            <div className="data">
                                <div className="stat_title">
                                    <p className="p_title">Motif le plus fréquent</p>
                                    <hr />
                                </div>
                                <div className="stat_data">
                                    <img src="/assets/icon/rdv-icon.svg" alt="" />
                                    <p>{stats.MostFrequentSubject.result}</p>
                                </div>
                            </div>
                            <div className="data">
                                <div className="stat_title">
                                    <p className="p_title">Nombre d’appelants uniques</p>
                                    <hr />
                                </div>
                                <div className="stat_data">
                                    <img src="/assets/icon/client-icon.svg" alt="" />
                                    <p>{stats.DifferentFrom.result} clients</p>
                                </div>
                            </div>
                        </div>
                        <div className="barchart_container">
                            <BarChart
                                width={500}
                                height={300}
                                series={[
                                    { data: timeStats, label: 'Temps gagné (minute)', id: 'Temps gagné' },
                                ]}
                                xAxis={[{ data: dayStats, scaleType: 'band' }]}
                            />
                        </div>
                    </div>

                <div className="table_container">
                    <div className="filtre">
                        <p>Filtre : </p>
                        <div className="inputbox">
                            <input type="checkbox" id="rdv" name="rdv" onChange={(e) => ApplyFilter("rdv")} />
                            <label htmlFor="rdv">Rendez-vous</label>
                        </div>
                        <div className="inputbox">
                            <input type="checkbox" id="Ordonnance" name="Ordonnance" onChange={(e) => ApplyFilter("ordonnance")} />
                            <label htmlFor="Ordonnance">Ordonnance</label>
                        </div>
                        <div className="inputbox">
                            <input type="checkbox" id="information" name="information" onChange={(e) => ApplyFilter("information")} />
                            <label htmlFor="information">Information</label>
                        </div>
                        <div className="inputbox">
                            <input type="checkbox" id="other" name="other" onChange={(e) => ApplyFilter("other")} />
                            <label htmlFor="other">Autre</label>
                        </div>

                    </div>
                    <button className="refresh_button" id="refresh_button" onClick={() => refreshButton()}> <img src="/assets/icon/refresh-icon.png" alt="" /> </button>
                </div>
                <CallTable calls={calls} />

            </div>
        </div>
    );
}
