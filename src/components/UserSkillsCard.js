import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function UserSkillsCard({data}){
    const userData = useContext(UserContext);
    
    return (
        <div class="box shadow-sm border rounded bg-white mb-3">
            <div class="box-title border-bottom p-3">
                <h6 class="m-0">Skills</h6>
            </div>
            <div class="box-body">
                {data && data.map((skill, i) => {
                    if(!skill || !skill.value) return;
                    return (<div class="d-flex align-items-center osahan-post-header p-3 border-bottom people-list" key={i}>
                        <div class="dropdown-list-image mr-3">
                            <img class="rounded-circle" src="./img/star.png" alt="" />
                        </div>
                        <div class="font-weight-bold">
                            <div class="text-truncate">{skill.value}</div>
                        
                        </div>
                    </div>)
                })}
            </div>
        </div>
    )
}
