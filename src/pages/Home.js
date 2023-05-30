import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import PeopleYouMightKnow from "../components/PeopleYouMightKnow";
import SiteCard from "../components/SiteCard";
import UserContext from "../context/UserContext";
import PostCard from "../components/PostCard";
import JobCard from "../components/JobCard";
import JobList from "../components/JobList";
import { fetchPosts } from "../firebase";
import CreatePost from "../components/modals/CreatePost";
import SharePost from "../components/SharePost";



export default function Home () {
    const userData = useContext(UserContext);

    const [posts, setPosts] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState({})
    
    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData(){
        let res = await fetchPosts();
        if(res.length > 0) setPosts(res);
    }
    
    return (
        <MainLayout>
            <CreatePost modalShow={modalShow} setModalShow={setModalShow} data={modalData} />
            <Header />
            <div className="py-4">
                <div className="container">
                    <div className="row">
                        <main className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                            {userData?.email &&
                                <div className="alert alert-info" role="alert">
                                    Hi <strong>{userData?.fullname}</strong> Please Complete Your Profile <a href="#" className="alert-link">Here</a>
                                </div>
                            }
                            <div className="row mb-3 rounded box bg-white">
                                <div className="col-12">
                                    <SharePost setModalShow={setModalShow} />
                                </div>
                                <JobList limit={3} />
                            </div>
                            {posts.map(post => <PostCard data={post} limit={true} />)}
                        </main>
                        <aside className="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
                            <ProfileCard/>
                            <SiteCard />
                        </aside>
                        <aside className="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">
                            <PeopleYouMightKnow />
                            
                        
                            <div className="box shadow-sm border rounded bg-white mb-3">
                                <div className="box-title border-bottom p-3">
                                    <h6 className="m-0">Jobs</h6>
                                </div>
                                <div className="box-body p-3">
                                    <JobList limit={2} />
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}