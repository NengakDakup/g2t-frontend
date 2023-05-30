import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function UserConnectCard({data}){
    const userData = useContext(UserContext);

    

    return (
        <div class="border network-item rounded mb-3">
            <div class="p-3 d-flex align-items-center network-item-header">
                <div class="dropdown-list-image mr-3">
                    <img class="rounded-circle" src={data.imageURL? data.imageURL : "./img/avatar.jpeg"}  alt="" />
                </div>
                <div class="font-weight-bold">
                    <h6 class="font-weight-bold text-dark mb-0">{data.fullname}</h6>
                    <div class="small text-black-50">{data.department}
                    <div className="small text-black-100">{data.institionName}</div>
                    </div>
                </div>
            </div>
            <div class="network-item-footer py-3 d-flex text-center">
                <div class="col-6 pl-3 pr-1">
                    <Link to={`/user/${data.uid}`} type="button"
                        class="btn btn-primary btn-sm btn-block">
                            <i
                            class="feather-user"></i> View
                    </Link>
                </div>
                <div class="col-6 pr-3 pl-1">
                    <Link to={`/messages?user=${data.uid}`} type="button"
                        class="btn btn-outline-primary btn-sm btn-block"> <i
                            class="feather-message-square"></i> Message </Link>
                </div>
            </div>
        </div>
        
    )
}
