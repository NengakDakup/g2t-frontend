import React, { useContext, useState, useEffect } from "react";
import MainLayout from "../components/layouts/MainLayout";
import Header from "../components/Header";

import SiteCard from "../components/SiteCard";
import UserContext from "../context/UserContext";

import JobList from "../components/JobList";
import { fetchSingleJobPost } from "../firebase";
import { useParams } from "react-router-dom";
import moment from "moment";




export default function Job () {
    const userData = useContext(UserContext);
    let { id } = useParams()

    const [job, setJob] = useState({})
    
    useEffect(() => {
        fetchData()
    }, [id])

    async function fetchData(){
        let jobData = await fetchSingleJobPost(id);
        setJob(jobData)
    }
    return (
        <MainLayout>
            <Header />
            <div class="profile-cover text-center">
                <img class="img-fluid" src="./img/job-profile.jpg" alt="" />
            </div>
            <div class="bg-white shadow-sm border-bottom">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="d-flex align-items-center py-3">
                                <div class="profile-left">
                                    <h5 class="font-weight-bold text-dark mb-1 mt-0">{job.title}</h5>
                                    <p class="mb-0 text-muted"><a class="mr-2 font-weight-bold">{job.companyName}</a> <i
                                            class="feather-map-pin"></i> {job.location} -- Posted {moment(job.date).format('LL')}</p>
                                </div>
                                <div class="profile-right ml-auto">
                                    <a href={job.applicationLink} type="button" class="btn btn-primary"> &nbsp; Apply &nbsp; </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="py-4">
                <div class="container">
                    <div class="row">

                        <main class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                            <div class="box shadow-sm border rounded bg-white mb-3">
                                <div class="box-title border-bottom p-3">
                                    <h6 class="m-0">Overview</h6>
                                </div>
                                <div class="box-body p-3">
                                    <p>
                                        {job.overview}
                                    </p>
                                </div>
                            </div>
                            <div class="box shadow-sm border rounded bg-white mb-3">
                                <div class="box-title border-bottom p-3">
                                    <h6 class="m-0">Job Details</h6>
                                </div>
                                <div class="box-body">
                                    <table class="table table-borderless mb-0">
                                        <tbody>
                                            <tr class="border-bottom">
                                                <th class="p-3">Seniority Level</th>
                                                <td class="p-3">{job.level}
                                                </td>
                                            </tr>
                                            <tr class="border-bottom">
                                                <th class="p-3">Location</th>
                                                <td class="p-3">{job.location}</td>
                                            </tr>
                                            <tr class="border-bottom">
                                                <th class="p-3">Employment Type</th>
                                                <td class="p-3">{job.employmentType}
                                                </td>
                                            </tr>
                                            <tr class="border-bottom">
                                                <th class="p-3">Job Requirements</th>
                                                <td class="p-3">{job.requirements}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                        </main>
                        <aside class="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
                            <div class="box mb-3 shadow-sm border rounded bg-white profile-box text-center">
                                <div class="p-5">
                                    <img src={job.companyImage} class="img-fluid" alt="Responsive image" />
                                </div>
                                <div class="p-3 border-top border-bottom">
                                    <h5 class="font-weight-bold text-dark mb-1 mt-0">{job.companyName}</h5>
                                    <p class="mb-0 text-muted">{job.location}
                                    </p>
                                </div>
                                <div class="p-3">
                                    <div class="d-flex align-items-top mb-2">
                                        <p class="mb-0 text-muted">Posted</p>
                                        <p class="font-weight-bold text-dark mb-0 mt-0 ml-auto">{moment(job.date).format('LL')}</p>
                                    </div>
                                    
                                </div>
                            </div>
                            
                        
                        </aside>
                        <aside class="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">
                        
                            <div class="box shadow-sm border rounded bg-white mb-3">
                                <div class="box-title border-bottom p-3">
                                    <h6 class="m-0">Other Jobs
                                    </h6>
                                </div>
                                <div class="box-body p-3">
                                    
                                    <JobList limit={3} />
                                </div>
                            </div>
                            
                            <SiteCard />
                        </aside>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}