import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function UserExperienceCard({data}){
    const userData = useContext(UserContext);
    
    return (
        <div class="box shadow-sm border rounded bg-white mb-3">
            <div class="box-title border-bottom p-3">
                <h6 class="m-0">Experience</h6>
            </div>
            {data.map((item, i) => {
                if(!item || !item.position) return;
                return (<div class="box-body p-3 border-bottom" key={i}>
                    <div class="d-flex align-items-top job-item-header pb-2">
                        <div class="mr-2">
                            <h6 class="font-weight-bold text-dark mb-0">{item.position}</h6>
                            <div class="text-truncate text-primary">{item.company}</div>
                            <div class="small text-gray-500">{item.date} </div>
                        </div>
                        <img class="img-fluid ml-auto mb-auto" src="./img/company.png" alt="" />
                    </div>
                    <p class="mb-0">{item.desc}</p>
                </div>)
            })}
            
           
        </div>
    )
}

