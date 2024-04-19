/* eslint-disable @next/next/no-img-element */
"use client"
import Sidebar from "@/components/Sidebar/Sidebar";
import axios from "axios"
import { useEffect, useState } from "react";
import "./all.scss"

import CallTable from "@/components/Table/CallTable/CallTable";
import TranslateSubject from "@/utils/TranslateSubject";
import FromatDate from "@/utils/FormatDate";
import ConvertDuration from "@/utils/ConvertDuration";
import ConvertNumber from "@/utils/ConvertNumber";
import AgentTable from "@/components/Table/AgentTable/AgentTable";

export default function Calls() {
    const [agents, setAgents] = useState([""])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                axios.get(`http://localhost:8000/api/calls/`)
                    .then((res) => {
                        setAgents(res.data);
                    })
            } catch (error) {
                console.log(error)
            }
        }
    }, [])

    return (
        <div className="page">
            <Sidebar page="all" AgentNumber={`+33769636348`} />
            <div className="dashboard_content">

                <div className="first_line">
                    <h1>Tous nos agents</h1>
                </div>

                <div className="table_container">
                    <AgentTable agents={agents} />
                </div>

            </div>
        </div>
    );
}
