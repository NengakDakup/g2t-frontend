import React, { useContext } from "react";
import UserContext from "../context/UserContext";

export default function SiteCard({}){
    const userData = useContext(UserContext);

    return (
        <div className="box shadow-sm mb-3 rounded bg-white ads-box text-center overflow-hidden">
            <img src="/img/logo.png" className="img-fluid p-2" alt="Responsive image" />
            <div className="p-3 border-bottom">
            <p className="mb-0 text-muted">Grow & nurture your network</p>
            </div>
        </div>
    )
}