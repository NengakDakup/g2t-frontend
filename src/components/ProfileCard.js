import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function ProfileCard({}){
    const userData = useContext(UserContext);
    return (
        <div className="box mb-3 shadow-sm border rounded bg-white profile-box text-center">
            <div className="py-4 px-3 border-bottom">
            <img src={userData?.imageURL? userData?.imageURL : './img/avatar.jpeg'} className="img-fluid mt-2 rounded-circle" alt="Responsive image" />
            <h5 className="font-weight-bold text-dark mb-1 mt-4">
                {userData?.name}
            </h5>
            <p className="mb-0 text-muted">{userData?.email}</p>
            </div>
            <div className="overflow-hidden border-top">
            {!userData?.email && 
               
                <Link className="font-weight-bold p-3 d-block" to="/login">
                    Login
                </Link>
            }
            {userData?.email &&
                 <>
                    <Link className="font-weight-bold p-3 d-block" to={"/user/" + userData?.uid}>
                    <i class="feather-eye"></i> View my profile
                    </Link>
                    <Link className="font-weight-bold p-3 d-block" to="/edit-profile">
                    <i class="feather-edit-2"></i> Edit profile
                    </Link>
                </>
            }
            </div>
        </div>
    )
}