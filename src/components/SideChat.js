import React, { useEffect, useState } from "react"
import moment from "moment"
import { fetchUserData, auth } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth";

export default function SideChat({chat, switchChat}){

    const [userData, setUserData] = useState({})
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
        fetchData()
    }, [user.uid])

    async function fetchData(){
        if(!user.uid) return;
        let userID = chat.participants.find(id => user.uid !== id);
        let res = await fetchUserData(userID)
        setUserData(res)
    }

    return (
        <div class="p-3 d-flex align-items-center border-bottom osahan-post-header overflow-hidden" style={{cursor: 'pointer'}} onClick={() => switchChat(chat)}>
            <div class="dropdown-list-image mr-3"><img class="rounded-circle"
                    src={userData.imageURL || "./img/avatar.jpeg"} alt="" /></div>
            <div class="font-weight-bold mr-1 overflow-hidden">
                <div class="text-truncate">{userData?.fullname}</div>
                <div class="small text-truncate overflow-hidden text-black-50"><i
                        class="feather-check text-primary"></i> {chat.messages[(chat.messages.length-1)].message}</div>
            </div>
            <span class="ml-auto mb-auto">
                <div class="text-right text-muted pt-1 small">{moment(chat.messages[(chat.messages.length-1)].date).format('LL')}</div>
            </span>
        </div>
    )
}