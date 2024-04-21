/* eslint-disable @next/next/no-img-element */
"use client"
import "./all.scss"
import Sidebar from "@/components/Sidebar/Sidebar";
import AgentTable from "@/components/Table/AgentTable/AgentTable";
import GetAgents from "@/utils/GetAgents";

import { useEffect, useState } from "react";


export default function Calls() {
    const [agents, setAgents] = useState([""])

    useEffect(() => {
        GetAgents(setAgents)
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
