/* eslint-disable @next/next/no-img-element */
"use client"
import Sidebar from "@/components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import axios from 'axios';
import "./calls.scss"

import CallTable from "@/components/Table/CallTable";
import TranslateSubject from "@/utils/TranslateSubject";
import FromatDate from "@/utils/FormatDate";
import ConvertDuration from "@/utils/ConvertDuration";
import ConvertNumber from "@/utils/ConvertNumber";

export default function Calls() {
    const [agentNumber, setAgenNumber] = useState("");
    const [calls, setCalls] = useState([
        {
            from: "",
            to: "",
            date: "",
            duration: 0,
            subject: "",
            summary: "",
            id: ""
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


    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                axios.get(`http://localhost:8000/api/calls/${new URL(window.location.href).pathname.split('/')[2]}`)
                    .then((res) => {
                        res.data.calls.forEach((element: { subject: string, date: string, duration: any, from: string }) => {
                            element.subject = TranslateSubject(element.subject)
                            element.date = FromatDate(element.date);
                            element.duration = ConvertDuration(element.duration);
                            element.from = ConvertNumber(element.from)
                        });
                        setCalls(res.data.calls);
                        setStats(res.data.statistics);
                        setAgenNumber(new URL(window.location.href).pathname.split('/')[2])
                    })
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

                <CallTable calls={calls} />

            </div>
        </div>
    );
}
