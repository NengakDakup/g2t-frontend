import React, { useContext, useState, useEffect } from "react";
import MainLayout from "../components/layouts/MainLayout";
import Header from "../components/Header";
import SiteCard from "../components/SiteCard";
import UserContext from "../context/UserContext";
import UserConnectCard from "../components/UserConnectCard";
import JobCard from "../components/JobCard"
import { search } from "../firebase";
import { useParams } from "react-router-dom";


export default function Search () {
    const userData = useContext(UserContext);
    
    const [data, setData] = useState({});
    const {query} = useParams()
   

    useEffect(() => {
        if(query) fetchData()
    }, [])

    async function fetchData(){
        let res = await search(query);
        setData(res)
        
    } 
    return (
        <MainLayout>
            <Header />

            <div class="py-4">
                <div class="container">
                    <div class="row">

                        <main class="col col-xl-9 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                            <div class="box shadow-sm border rounded bg-white mb-3 osahan-share-post">
                                <h5 class="pl-3 pt-3 pr-3 border-bottom mb-0 pb-3">Search Results for {query}</h5>
                                
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="p-3">
                                        <h5>Users Found:</h5>
                                            <div class="row">
                            
                                                {data?.users?.map(user => {
                                                    return <div class="col-md-4">
                                                        <UserConnectCard data={user}/>
                                                    </div>
                                                })}
                                                
                                                
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="p-3">
                                        <h5>Jobs Found:</h5>
                                            <div class="row">
                            
                                                
                                            {data?.jobs?.map(job => {
                                                    return <div class="col-md-4">
                                                        <JobCard job={job}/>
                                                    </div>
                                                })}
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                        <aside class="col col-xl-3 order-xl-2 col-lg-12 order-lg-2 col-12">
                            
                            <SiteCard />
                        </aside>
                    </div>
                </div>
            </div>
            
        </MainLayout>
    )
}