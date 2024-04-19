/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from 'next/navigation'
import "./HomeBanner.scss"

export default function HomeBanner() {
    const [inputData, setInputData] = useState("")
    const router = useRouter()

    async function handleKeyDown(event: { key: string; }) {
        if (event.key === 'Enter') {
            router.push(`/calls/${inputData}`);
        }
    }
    return (
        <>
            <div className="banner">
                <div className="banner_left">
                    <img src="/assets/logo.png" alt="" />
                </div>
                <div className="banner_right">
                    <h1>Suivez vos Agents !</h1>
                    <p className="banner_subtitle">E, est une plateforme qui vous permet de<br></br> suivre chacun de vos agents dans toutes leurs actions.</p>
                    <p className="banner_try">Allez-y, essayez !</p>
                    <div className="banner_search">
                        <img src="/assets/icon/search-icon.png" alt="" />
                        <input type="text" placeholder="+33769636348" onKeyDown={handleKeyDown} onChange={e => setInputData(e.target.value)} />
                    </div>
                </div>
            </div>
        </>
    )
}