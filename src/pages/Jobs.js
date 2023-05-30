import React, { useContext, useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import Header from "../components/Header";

import PeopleYouMightKnow from "../components/PeopleYouMightKnow";
import SiteCard from "../components/SiteCard";
import UserContext from "../context/UserContext";

import JobList from "../components/JobList";



export default function Jobs () {
    const userData = useContext(UserContext);
    return (
        <MainLayout>
            <Header />

            <div class="py-4">
                <div class="container">
                    <div class="row">

                        <main class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                            <div class="box shadow-sm border rounded bg-white mb-3 osahan-share-post">
                                <form class="job-search p-3 border-bottom">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Search jobs" aria-label="Search"
                                            aria-describedby="basic-addon2" />
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary" type="button">
                                                <i class="feather-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
        
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="p-3 border-top">
                                            <div class="row">
                                                <JobList limit={10} />
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>

                        <aside class="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
                           <SiteCard />
                        </aside>

                        <aside class="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">
                            <PeopleYouMightKnow />
                        </aside>
                    </div>
                </div>
            </div>
            
        </MainLayout>
    )
}