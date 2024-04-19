/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from 'next/navigation'
import CheckNumber from "@/utils/CheckNumber";

import "./HomeBanner.scss"

export default function HomeBanner() {
    const [inputData, setInputData] = useState("")
    const [showError, setShowError] = useState(false);
    const router = useRouter()

    async function handleKeyDown(event: { key: string; }) {
        if (event.key === 'Enter') {
            if (CheckNumber(inputData) == "error") {
                setShowError(true);
                return "ko"
            } else {
                setShowError(false);
                router.push(`/calls/${CheckNumber(inputData)}`);
            }
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
                    {showError ? <p className="error">Format accepté : 0XXXXXXXXX, +33XXXXXXXXX, +33 XX XX XX XX, 0X XX XX XX XX</p> : null}

                </div>
            </div>
        </>
    )
}