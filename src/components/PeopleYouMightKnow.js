import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { fetchRecords, fetchUsers } from "../firebase";

export default function PeopleYouMightKnow({}){
    const userData = useContext(UserContext);

    const [users, setUsers] = useState([]);
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData(){
        let usersData = await fetchUsers();
        setUsers(usersData)
        let usersRecords = await fetchRecords();
        setRecords(usersRecords);
    }
    
    return (
        <div className="box shadow-sm border rounded bg-white mb-3">
            <div className="box-title border-bottom p-3">
                <h6 className="m-0">People</h6>
            </div>
            <div className="box-body p-3">
                {users.map((user, i) => {
                
                    if(i>4) return;
                    return (<Link to={`/user/${user.uid}`} key={i}>
                        <div className="d-flex align-items-center osahan-post-header mb-3 people-list">
                            <div className="dropdown-list-image mr-3">
                                <img className="rounded-circle" src={user.imageURL? user.imageURL : "./img/avatar.jpeg"} alt="" />
                                <div className="status-indicator bg-success"></div>
                            </div>
                            <div className="font-weight-bold mr-2">
                                <div className="text-truncate">{user.fullname}</div>
                                <div className="small text-gray-500">{user.department}</div>
                                <div className="small text-gray-500">{user.institionName}</div>
                            </div>
                            <span className="ml-auto">
                                <button type="button" className="btn btn-light btn-sm">
                                    <i className="feather-user"></i>
                                </button>
                            </span>
                        </div>
                    </Link>)
                })}
                
                
            </div>
        </div>
    )
}