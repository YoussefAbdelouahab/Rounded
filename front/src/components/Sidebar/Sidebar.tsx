/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CheckNumber from "@/utils/CheckNumber";

import "./Sidebar.scss"
import { useState } from 'react'
import axios from 'axios';

export default function Sidebar({ page = "", AgentNumber = "" }) {
    const [inputData, setInputData] = useState("")
    const [showError, setShowError] = useState(false);
    const [showError2, setShowError2] = useState(false);
    const router = useRouter()

    async function handleKeyDown(event: { key: string; }) {
        if (event.key === 'Enter') {
            if (CheckNumber(inputData) == "error") {
                setShowError2(false);
                setShowError(true);
                return "ko"
            } else {
                axios.get(`http://localhost:8000/api/calls/${CheckNumber(inputData)}`)
                    .then((res) => {
                        if (res.data.calls.length != 0) {
                            router.push(`/calls/${CheckNumber(inputData)}`);
                        } else {
                            setShowError(false);
                            setShowError2(true);
                        }
                    })
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
                    <Link href={`/calls/${AgentNumber}`} className={page == 'dashboard' ? 'dashboard_button active' : 'dashboard_button'}><img src="/assets/icon/dashboard-icon.png" alt="" />Tableau de bord</Link>
                    <Link href="/all" className={page == 'all' ? 'dashboard_button active' : 'dashboard_button'}><img src="/assets/icon/group-icon.svg" alt="" />Tous nos agents</Link>
                    <div className="sidebar_search">
                        <img src="/assets/icon/search-icon.png" alt="" />
                        <input type="text" placeholder={`${AgentNumber}`} onKeyDown={handleKeyDown} onChange={e => setInputData(e.target.value)} />
                    </div>
                    {showError || showError2 ? <div className="sidebar_error">
                        {showError ? <p className="error">Format accepté : 0XXXXXXXXX, +33XXXXXXXXX, +33 XX XX XX XX, 0X XX XX XX XX</p> : null}
                        {showError2 ? <p className="error">Le numéro entré ne correspond à aucun agent.</p> : null}
                    </div> : null}
                </div>
            </div>
            <div className="sidebar_responsive">
                <div className="e_logo">
                    <img src="/assets/logo.png" alt="" />
                </div>
                <div className="sidebar_links">
                    <a href="/"><div className={page == 'home' ? 'img_bg active' : 'img_bg'}>
                        <img src="/assets/icon/home-icon.svg" alt="" />
                    </div></a>
                    
                    <a href="/calls/+33769636348"><div className={page == 'dashboard' ? 'img_bg active' : 'img_bg'}>
                        <img src="/assets/icon/dashboard-icon.png" alt="" />
                    </div></a>
                    <a href="/all"><div className={page == 'all' ? 'img_bg active' : 'img_bg'}>
                        <img src="/assets/icon/group-icon.svg" alt="" />
                    </div></a>
                </div>
            </div>
        </>
    )
}