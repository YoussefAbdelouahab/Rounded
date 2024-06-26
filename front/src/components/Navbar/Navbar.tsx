/* eslint-disable @next/next/no-img-element */
import { useState } from "react"
import { useRouter } from 'next/navigation'
import CheckNumber from "@/utils/CheckNumber";
import "./Navbar.scss"

export default function Navbar() {
    const [Active, setActive] = useState(false);
    const router = useRouter()

    const [inputData, setInputData] = useState("")
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
            <div className="header">
                <div className="head_container">
                    <a href="/">
                        <div className="nav_logo">
                            <img src="/assets/logo.png" alt="" />
                        </div>
                    </a>
                    <div className="nav_links">
                        <ul>
                            <a href="/" ><li>Accueil</li></a>
                            <a href="/all"><li>Agents</li></a>
                        </ul>
                    </div>
                    <div className="nav_icons" onClick={() => setActive(true)}>
                        <img src="/assets/icon/search-icon.png" alt="" />
                    </div>
                    <div className={Active ? "nav_search active" : "nav_search"}>
                        <img src="/assets/icon/search-icon.png" alt="" />
                        <input type="text" placeholder="+33769636348" onKeyDown={handleKeyDown} onChange={e => setInputData(e.target.value)} />
                        <img src="/assets/icon/cross-icon.png" alt="" className="cross" onClick={() => setActive(false)} />
                    </div>
                </div>
            </div>
        </>
    )
}