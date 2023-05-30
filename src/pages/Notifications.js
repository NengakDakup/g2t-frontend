import React, { useContext, useState, useEffect } from "react";
import MainLayout from "../components/layouts/MainLayout";
import Header from "../components/Header";

import PeopleYouMightKnow from "../components/PeopleYouMightKnow";
import SiteCard from "../components/SiteCard";
import UserContext from "../context/UserContext";

import JobList from "../components/JobList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, fetchNotifications, readNotification } from "../firebase";
import { useNavigate } from "react-router-dom";


export default function Notifications () {
    const userData = useContext(UserContext);
    const [user, loading, error] = useAuthState(auth);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate()
    
    useEffect(() => {
        if(user?.uid){
            fetchData()
        }
        
    }, [user])

    async function fetchData(){
        let res = await fetchNotifications(user.uid);
        setNotifications(res)
    }

    function handleNotificationClick(notif){
        //add userid to read notifications read list list if it isn't there
        if(!notif.readBy.includes(user.uid)){
            readNotification(user.uid, notif.id)
        }
        navigate(notif.link)
    }

    return (
        <MainLayout>
            <Header />

            <div class="py-4">
                <div class="container">
                    <div class="row">

                        <main class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                            
                            <div class="box shadow-sm border rounded bg-white mb-3">
                                <div class="box-title border-bottom p-3">
                                    <h6 class="m-0">Notifications</h6>
                                </div>
                                {
                                    notifications.map(notif => {
                                        let read = notif.readBy.includes(user?.uid);
                                        return (
                                            <div class="box-body p-0" style={{cursor: 'pointer'}} onClick={() => {handleNotificationClick(notif);}}>
                                                <div class="p-3 d-flex align-items-center border-bottom osahan-post-header" style={{backgroundColor: read? 'default' : '#ebebeb'}}>
                                                    <div
                                                        class="dropdown-list-image mr-3 d-flex align-items-center bg-danger justify-content-center rounded-circle text-white">
                                                        N</div>
                                                    <div class="font-weight-bold mr-3">
                                                        <div class="text-truncate">{notif.title}</div>
                                                        <div class="small">{notif.message}. </div>
                                                    </div>
                                                
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                
                            </div>
                        </main>
                        <aside class="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
                            <SiteCard />
                        </aside>
                        <aside class="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">
                            <PeopleYouMightKnow />
                            <JobList limit={3} />
                        </aside>
                    </div>
                </div>
            </div>
            
        </MainLayout>
    )
}