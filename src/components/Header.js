import React, { useState, useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from 'react-router-dom';

import { logout, auth, fetchNotifications } from '../firebase';
import UserContext from "../context/UserContext";

const Header = () => {
    const [query, setQuery] = useState('')
    let navigate = useNavigate('');
    const [user, loading, error] = useAuthState(auth);
    const [unread, setUnread] = useState(0)
    
    const userData = useContext(UserContext);

    useEffect(() => {
        if(user?.uid){
            updateNotificationCount();
        }
    }, [user])


    async function signOut(){
        localStorage.removeItem('userData')
        await logout();
        navigate("/login")
    }

    async function updateNotificationCount(){
        let notifs = await fetchNotifications(user.uid);
        let count = 0;
        notifs.forEach(notif => {
            if(!notif.readBy.includes(user.uid)){
                count++;
            }
        })
        setUnread(count)
    }

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark osahan-nav-top p-0">
            <div className="container">
            <a className="navbar-brand mr-2" href="/"><img src="./img/logo.png" alt="" />
            </a>
            <form className="d-none d-sm-inline-block form-inline mr-auto my-2 my-md-0 mw-100 navbar-search" onSubmit={(e) => {e.preventDefault();query && navigate(`/search/${query}`)}}>
                <div className="input-group">
                <input value={query} onChange={(e) => setQuery(e.target.value)} style={{color: '#fff'}} type="text" className="form-control shadow-none border-0" placeholder="Search people, jobs & more..."
                    aria-label="Search" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button className="btn" type="button" onClick={() => {query && navigate(`/search/${query}`)}}>
                    <i className="feather-search"></i>
                    </button>
                </div>
                </div>
            </form>
            <ul className="navbar-nav ml-auto d-flex align-items-center">
                <li className="nav-item dropdown no-arrow d-sm-none">
                <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i className="feather-search mr-2"></i>
                </a>

                <div className="dropdown-menu dropdown-menu-right p-3 shadow-sm animated--grow-in"
                    aria-labelledby="searchDropdown">
                    <form className="form-inline mr-auto w-100 navbar-search" onSubmit={(e) => {e.preventDefault();query && navigate(`/search/${query}`)}}>
                    <div className="input-group">
                        <input value={query} onChange={(e) => setQuery(e.target.value)} style={{color: '#fff'}} type="text" className="form-control border-0 shadow-none"
                        placeholder="Search people, jobs and more..." aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                        <button className="btn" type="button" onClick={() => {query && navigate(`/search/${query}`)}}>
                            <i className="feather-search"></i>
                        </button>
                        </div>
                    </div>
                    </form>
                </div>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/"><i className="feather-home mr-2"></i><span
                    className="d-none d-lg-inline">Home</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/jobs"><i className="feather-briefcase mr-2"></i><span
                    className="d-none d-lg-inline">Jobs</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/connection"><i className="feather-users mr-2"></i><span
                    className="d-none d-lg-inline">Connection</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/faq"><i className="feather-help-circle mr-1"></i> FAQ</Link>
                </li>
                
                {!user && 
                    <li className="nav-item" onClick={() => navigate('/login')}>
                        <button type="button" className="btn btn-primary btn-sm btn-block ml-2">
                            <i className="feather-user-plus"></i>
                            {" "}Login 
                        </button>
                    </li>
                }
                {user && 
                    <>
                        <li className="nav-item dropdown no-arrow mx-1 osahan-list-dropdown">
                            <Link className="nav-link" to={user? '/messages' : '/login'} >
                                <i className="feather-message-square"></i>
                                {/* <span className="badge badge-danger badge-counter">8</span> */}
                            </Link>
                        </li>
                        <li className="nav-item dropdown no-arrow mx-1 osahan-list-dropdown">
                            <Link className="nav-link" to={user? '/notifications' : '/login'} >
                                <i className="feather-bell"></i>
                                {unread > 0 && <span className="badge badge-info badge-counter">{unread}</span>}
                            </Link>
                        </li>
                        <li className="nav-item dropdown no-arrow ml-1 osahan-profile-dropdown">
                        <a className="nav-link dropdown-toggle pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="true">
                            <img className="img-profile rounded-circle" src="./img/avatar.jpeg" />
                        </a>

                            <div className="dropdown-menu dropdown-menu-right shadow-sm">
                                <div className="p-3 d-flex align-items-center">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src={userData?.imageURL? userData?.imageURL : './img/avatar.jpeg'} alt="" />
                                        <div className="status-indicator bg-success"></div>
                                    </div>
                                    <div className="font-weight-bold">
                                        <div className="text-truncate">{userData?.fullname}</div>
                                        <div className="small text-gray-500">{userData?.email}</div>
                                    </div>
                                </div>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to={`/user/${userData?.uid}`}><i className="feather-edit mr-1"></i> My Account</Link>
                                <Link className="dropdown-item" to="/edit-profile"><i className="feather-user mr-1"></i> Edit Profile</Link>
                                {userData?.admin && <Link className="dropdown-item" to="/admin"><i className="feather-lock mr-1"></i> Admin Panel</Link>}
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#" onClick={signOut}><i className="feather-log-out mr-1"></i> Logout</a>
                            </div>
                        </li>
                    </>
                }
                
            </ul>
            </div>
        </nav>
    )
}

export default Header