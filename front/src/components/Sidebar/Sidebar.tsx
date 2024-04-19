/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CheckNumber from "@/utils/CheckNumber";

import "./Sidebar.scss"
import { useState } from 'react'

export default function Sidebar({ page = "", AgentNumber = "" }) {
    const [inputData, setInputData] = useState("")
    const router = useRouter()

    async function handleKeyDown(event: { key: string; }) {
        if (event.key === 'Enter') {
            if (CheckNumber(inputData) == "error") {
                return "ko"
            } else {
                router.push(`/calls/${CheckNumber(inputData)}`);
            }
        }
    }
    return (
        <>
            <div className="sidebar">
                <div className="e_logo">
                    <img src="/assets/logo.png" alt="" />
                </div>
                <div className="sidebar_links">
                    <Link href="/" className={page == 'home' ? 'dashboard_button active' : 'dashboard_button'}><img src="/assets/icon/home-icon.svg" alt="" />Accueil</Link>
                    <Link href={`/calls/${AgentNumber}`} className={page == 'dashboard' ? 'dashboard_button active' : 'dashboard_button'}><img src="/assets/icon/dashboard-icon.svg" alt="" />Tableau de bord</Link>
                    <Link href="/all" className={page == 'all' ? 'dashboard_button active' : 'dashboard_button'}><img src="/assets/icon/group-icon.svg" alt="" />Tous nos agents</Link>
                    <div className="sidebar_search">
                        <img src="/assets/icon/search-icon.png" alt="" />
                        <input type="text" placeholder={`${AgentNumber}`} onKeyDown={handleKeyDown} onChange={e => setInputData(e.target.value)} />
                    </div>
                </div>
            </div>
        </>
    )
}