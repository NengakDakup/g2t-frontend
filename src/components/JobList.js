import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { fetchJobPosts } from "../firebase";
import JobCard from "./JobCard";

export default function JobList({limit}){
    const userData = useContext(UserContext);

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData(){
        let jobsData = await fetchJobPosts();
        setJobs(jobsData)
    }
    
    return (
        <>
            {jobs.map((job, i) => {
                if(i>limit) return;
                return <JobCard job={job} key={i} />
            })}    
        </>
    )
}