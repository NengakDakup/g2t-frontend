import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import ProfileViewsCard from "../components/ProfileViewsCard";
import PeopleYouMightKnow from "../components/PeopleYouMightKnow";
import SiteCard from "../components/SiteCard";
import UserContext from "../context/UserContext";
import JobList from "../components/JobList";
import UserProfileCard from "../components/UserProfieCard";
import UserAboutCard from "../components/UserAboutCard";
import UserExperienceCard from "../components/UserExperienceCard";
import UserEducationCard from "../components/UserEducationCard";
import UserSkillsCard from "../components/UserSkillsCard";
import { useParams } from "react-router-dom";
import { fetchUserFullRecords } from "../firebase";
import ObjectToArray from "../utils/ObjectToArray";



export default function User () {
    const [user, setUser] = useState({})
    const [skills, setSkills] = useState([])
    const [about, setAbout] = useState({})
    const [employment, setEmployment] = useState([])
    const [education, setEducation] = useState([])
    const userData = useContext(UserContext);
    let { id } = useParams();

    useEffect(() => {
        setUser({})
        setSkills([])
        setAbout({})
        setEmployment([])
        setEducation([])
        
        getData()
    }, [id])

    async function getData(){
        let res = await fetchUserFullRecords(id)
        setUser(res)
        setSkills(res.userProfileData?.qualification?.filter((item, i) => !(i%2)))
        setAbout(res.userProfileData?.profile?.find(item => item.title === 'About You'))

        processEmploymentData(res)
        processQualificationData(res)
    }

    function processEmploymentData(user){
        
        let dataArr = [user.userProfileData?.employment]

        ObjectToArray(user.userProfileData?.otherEmploymentData).forEach(item => dataArr.push(item))
        ObjectToArray(user.userProfileData?.previousEmploymentData).forEach(item => dataArr.push(item))

        
        let arr = [];
        
        dataArr.forEach(item => {
            if(!item) return;
            let yes, position, company, date, desc;

           
            
            position = item.find(job => job.title === "Position").value;
            company = item.find(job => job.title === "Name of Organisation").value;
            date = item.find(job => job.title === "Date Of Employment").value;
            desc = item.find(job => job.title === "Job Description").value;

            arr.push({position, company, date, desc})
        })
       
        setEmployment(arr)

    }

    function processQualificationData(user){
        let dataArr = [];

        ObjectToArray(user.userProfileData?.otherQualificationData).forEach(item => dataArr.push(item))

        let arr = [];

        dataArr.forEach(item => {
            let school, course, date;

            school = item.find(dat => dat.title === "University Attended").value || item.find(dat => dat.title === "Polytechnic Attended").value || item.find(dat => dat.title === "College Attended").value;
            course = item.find(dat => dat.title === "Course of Study").value;
            date = item.find(dat => dat.title === "Year Of Graduation").value;

            arr.push({school, course, date})
        })

        setEducation(arr)
    }

    
    return (
        <MainLayout>
            <Header />
            <div class="py-4">
                <div class="container">
                    <div class="row">

                        <aside class="col col-xl-3 order-xl-1 col-lg-12 order-lg-1 col-12">
                            <UserProfileCard data={user?.userData} profile={user?.userProfileData?.profile}  />
                            <UserSkillsCard data={skills} />
                        </aside>
                        <main class="col col-xl-6 order-xl-2 col-lg-12 order-lg-2 col-md-12 col-sm-12 col-12">
                            <UserAboutCard data={about}/>
                            <UserExperienceCard data={employment}/>
                            <UserEducationCard data={education} userData={user?.userData}/>
                        </main>
                        <aside class="col col-xl-3 order-xl-3 col-lg-12 order-lg-3 col-12">
                            <PeopleYouMightKnow />
                            <JobList limit={2} />
                            
                            <SiteCard />
                        </aside>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}