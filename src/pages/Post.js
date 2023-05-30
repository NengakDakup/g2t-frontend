import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import PeopleYouMightKnow from "../components/PeopleYouMightKnow";
import SiteCard from "../components/SiteCard";
import UserContext from "../context/UserContext";
import PostCard from "../components/PostCard";
import JobCard from "../components/JobCard";
import { fetchPosts, fetchSinglePost } from "../firebase";
import { useParams } from "react-router-dom";
import JobList from "../components/JobList";



export default function Post () {
    const [post, setPost] = useState({})
    const {error, setError} = useState(null)
    const userData = useContext(UserContext);

    const {id} = useParams()

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData(){
        let res = await fetchSinglePost(id)
        if(res.id) setPost(res)
        else setError('Post Not Found')
    }
    
    return (
        <MainLayout>
            <Header />
            <div className="py-4">
                <div className="container">
                    <div className="row">
                        <main className="col col-xl-8 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                            {post.id? <PostCard data={post} /> : 'Loading Post...' }
                            {/* {error && <p>{error}</p>} */}
                        </main>
                       
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