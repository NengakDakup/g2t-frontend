import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function UserAboutCard({data}){
    const userData = useContext(UserContext);

    return (
        <div class="box shadow-sm border rounded bg-white mb-3">
            <div class="box-title border-bottom p-3">
                <h6 class="m-0">About</h6>
            </div>
            <div class="box-body p-3">
                <p>
                    {data?.value}
                </p>
                
            </div>
        </div>
    )
}
