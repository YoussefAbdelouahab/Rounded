/* eslint-disable @next/next/no-img-element */
import { useState } from "react"
import { useRouter } from 'next/navigation'
import "./Navbar.scss"

export default function Navbar() {
    const [Active, setActive] = useState(false);
    const router = useRouter()

    function ShowSearch() {
        setActive(true);
    }
    function HideSearch() {
        setActive(false)
    }

    const [inputData, setInputData] = useState("")
    async function handleKeyDown(event: { key: string; }) {
        if (event.key === 'Enter') {
            if (event.key === 'Enter') {
                router.push(`/calls/${inputData}`);
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
                            <a href="/agents"><li>Agents</li></a>
                        </ul>
                    </div>
                    <div className="nav_icons" onClick={() => ShowSearch()}>
                        <img src="/assets/icon/search-icon.png" alt="" />
                    </div>
                    <div className={Active ? "nav_search active" : "nav_search"}>
                        <img src="/assets/icon/search-icon.png" alt="" />
                        <input type="text" placeholder="+33769636348" onKeyDown={handleKeyDown} onChange={e => setInputData(e.target.value)} />
                        <img src="/assets/icon/cross-icon.png" alt="" className="cross" onClick={() => HideSearch()} />
                    </div>
                </div>
            </div>
        </>
    )
}