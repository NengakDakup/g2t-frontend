import React, { useContext } from "react";

import UserContext from "../context/UserContext";

export default function SharePost({setModalShow}){
    const userData = useContext(UserContext);
    if(userData?.fullname){ return (
        <div class="box shadow-sm border rounded bg-white mb-3 osahan-share-post">
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div class="p-3 d-flex align-items-center w-100" href="#">
                        <div class="dropdown-list-image mr-3">
                            <img class="rounded-circle" src={userData?.imageURL || '/img/avatar.jpeg'} alt="" />
                            <div class="status-indicator bg-success"></div>
                        </div>
                        <div class="w-100">
                            <p>Hi {userData?.fullname}, You Can share your thoughts through a post</p>
                            <button onClick={() => setModalShow(true)} type="button" class="btn btn-primary btn-sm">Create A Post</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )} else return <></>
}