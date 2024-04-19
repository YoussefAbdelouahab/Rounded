/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import "./Sidebar.scss"
import { useState } from 'react'

export default function Sidebar({ page = "", AgentNumber = "" }) {
    const [inputData, setInputData] = useState("")
    const router = useRouter()

    async function handleKeyDown(event: { key: string; }) {
        if (event.key === 'Enter') {
            router.push(`/calls/${inputData}`);
        }
    }
    return (
        <>
            <div className="sidebar">
                <div className="e_logo">
                    <img src="/assets/logo.png" alt="" />
                </div>
                <div className="sidebar_links">
                    <Link href={`/calls/${AgentNumber}`} className={page == 'dashboard' ? 'dashboard_button active' : 'dashboard_button'}><img src="/assets/icon/home-icon.svg" alt="" />Tableau de bord</Link>
                    <Link href="/all" className={page == 'all' ? 'dashboard_button active' : 'dashboard_button'}><img src="/assets/icon/group-icon.svg" alt="" />Tous les agents</Link>
                    <div className="sidebar_search">
                        <img src="/assets/icon/search-icon.png" alt="" />
                        <input type="text" placeholder={`${AgentNumber}`} onKeyDown={handleKeyDown} onChange={e => setInputData(e.target.value)} />
                    </div>
                </div>
            </div>
        </>
    )
}