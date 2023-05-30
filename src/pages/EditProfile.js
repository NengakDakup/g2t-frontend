import React, { useContext, useState,useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import {FaArrowRight, FaArrowLeft} from 'react-icons/fa';
import {auth, updateProfileData, fetchUserRecords} from '../firebase'
import MainLayout from "../components/layouts/MainLayout";
import Header from "../components/Header";

import UserContext from "../context/UserContext";

import ObjectToArray from '../utils/ObjectToArray'

import FormTab from "../components/forms/FormTab";
import ProfileForm from "../components/forms/ProfileForm";
import QualificationForm from "../components/forms/QualificationForm";
import EmploymentForm from "../components/forms/EmploymentForm";
import PreviousEmploymentForm from "../components/forms/PreviousEmploymentForm";
import OtherEmploymentForm from "../components/forms/OtherEmploymentForm";
import OtherQualificationForm from "../components/forms/OtherQualificationForm";



import universities from '../universities.json';
import polytechnics from '../polytechnics.json';
import colleges from '../colleges.json'
import states from '../states.json'


const salaryRange = (min, max, interval) => {
    let arr = [];
    for(let i = min; i < max; i+=interval){
        let txt = `${i},000 - ${i+interval},000`;
        let maxText = `${i+interval},000 and above`;
        arr.push(txt)
        if((i+interval) >= max){
            arr.push(maxText)
        } 
        
    }
    return arr;
}




export default function EditProfile () {
    const userData = useContext(UserContext);
    const [jobs, setJobs] = useState([1,2,3,4,5,6,7,8,9])
    let navigate = useNavigate('');
    let [activeTab, setActiveTab] = useState(1)
    const [user, loading, error] = useAuthState(auth);
    const [skillsAdded, setSkillsAdded] = useState(1);
    let [profileData, setProfileData] = useState([
        {
            title: 'About You',
            type: 'text',
            value: ''
        },
        {
            title: 'Title',
            type: 'select',
            value: '',
            options: ['Mr', 'Mrs', 'Ms', 'Dr', 'Prof', 'Chief']
        },
        {
            title: 'First Name',
            type: 'text',
            value: ''
        },
        {
            title: 'Middle Name',
            type: 'text',
            value: ''
        },
        {
            title: 'Last Name',
            type: 'text',
            value: ''
        },
        {
            title: 'Gender',
            type: 'select',
            value: '',
            options: ['Male', 'Female']
        },
        {
            title: 'Date Of Birth',
            type: 'date',
            value: ''
        },
        {
            title: 'NIN',
            type: 'text',
            value: ''
        },
        {
            title: 'Religion',
            type: 'select',
            value: '',
            options: ['Christianity', 'Islam', 'Others']
        },
        {
            title: 'Nationality',
            type: 'text',
            value: ''
        },
        {
            title: 'State Of Origin',
            type: 'select',
            value: '',
            options: states.map(state => state.state)
        },
        {
            title: 'Local Government Area',
            type: 'text',
            value: '',
           
        },
        {
            title: 'Marital Status',
            type: 'select',
            value: 'Married',
            options: ['Married', 'Single', 'Divorced', 'Widow/Widower']
        },
        {
            title: 'Date Of Marriage',
            type: 'date',
            value: '',
            requiredTitle: 'Marital Status',
            requiredValue: 'Married'
        },
        {
            title: 'Date Of Divorce',
            type: 'date',
            value: '',
            requiredTitle: 'Marital Status',
            requiredValue: 'Divorced'
        },
        {
            title: 'Date Of Widow/Widower',
            type: 'date',
            value: '',
            requiredTitle: 'Marital Status',
            requiredValue: 'Widow/Widower'
        },
        {
            title: 'Number of Children',
            type: 'number',
            value: ''
        },
        {
            title: 'Number of Dependents',
            type: 'number',
            value: ''
        },
        {
            title: 'Physical Address',
            type: 'text',
            value: ''
        },
        {
            title: 'Office Address',
            type: 'text',
            value: ''
        },
        {
            title: 'Do You Have Any Disability?',
            type: 'select',
            value: '',
            options: ['Yes', 'No']
        },
        {
            title: 'If Yes Specify',
            type: 'text',
            value: '',
            requiredTitle: 'Do You Have Any Disability?',
            requiredValue: 'Yes'
        },
        {
            title: 'When Did it Occur?',
            type: 'select',
            value: '',
            options: ['Before Graduation', 'After Graduation'],
            requiredTitle: 'Do You Have Any Disability?',
            requiredValue: 'Yes'
        },
        {
            title: 'Contact [Mobile Phone Number]',
            type: 'number',
            value: ''
        },
        {
            title: 'Institution Attended',
            type: 'select',
            value: '',
            options: ['University', 'Polytechnic', 'College Of Education']
        },
        {
            title: 'University Attended',
            type: 'select',
            value: '',
            options: universities.map(item => item.name),
            requiredTitle: 'Institution Attended',
            requiredValue: 'University'
        },
        {
            title: 'Polytechnic Attended',
            type: 'select',
            value: '',
            options: polytechnics.map(item => item),
            requiredTitle: 'Institution Attended',
            requiredValue: 'Polytechnic'
        },
        {
            title: 'College Attended',
            type: 'select',
            value: '',
            options: colleges.map(item => item.name),
            requiredTitle: 'Institution Attended',
            requiredValue: 'College Of Education'
        },
        {
            title: 'Year Of Entry',
            type: 'date',
            value: ''
        },
        {
            title: 'Entry Mode',
            type: 'select',
            value: '',
            options: ['Sandwich', 'Part Time', 'Full Time']
        },
        {
            title: 'Matriculation Number',
            type: 'text',
            value: ''
        },
        {
            title: 'Faculty / School',
            type: 'text',
            value: ''
        },
        {
            title: 'Department',
            type: 'text',
            value: ''
        },
        {
            title: 'Course of Study',
            type: 'text',
            value: ''
        },
        {
            title: 'Year Of Graduation',
            type: 'date',
            value: ''
        },
        {
            title: 'Class Of Degree',
            type: 'select',
            value: '',
            options: [
                'First Class',
                'Second Class Upper',
                'Second Class Lower',
                'Third class',
                'Pass',
                'Distinction',
                'Upper Credit',
                'Lower Credit',
                'Credit',
                'Merit'
            ]
        },
        {
            title: 'Awards',
            type: 'text',
            value: ''
        },
        {
            title: 'Facebook',
            type: 'text',
            value: ''
        },
        {
            title: 'Twitter',
            type: 'text',
            value: ''
        },
        {
            title: 'Instagram',
            type: 'text',
            value: ''
        },
        {
            title: 'Linkedin',
            type: 'text',
            value: ''
        },
        {
            title: 'Research Gate',
            type: 'text',
            value: ''
        },
        {
            title: 'Whatsapp',
            type: 'text',
            value: ''
        },
        
        
        
        
    ]);
    let [qualificationData, setQualificationData] = useState([
        {
            title: 'Special Skill Acquired Before Graduation',
            type: 'text',
            value: '',
        },
        {
            title: 'Enter Skill Level',
            type: 'select',
            value: '',
            options: ['NSQ LEVEL 0', 'NSQ LEVEL 1', 'NSQ LEVEL 2', 'NSQ LEVEL 3', 'NSQ LEVEL 4', 'NSQ LEVEL 5', 'NSQ LEVEL 6', 'NSQ LEVEL 7', 'NSQ LEVEL 8']
        },
        {
            title: 'Special Skill Acquired After Graduation',
            type: 'text',
            value: '',
        },
        {
            title: 'Enter Skill Level',
            type: 'select',
            value: '',
            options: ['NSQ LEVEL 0', 'NSQ LEVEL 1', 'NSQ LEVEL 2', 'NSQ LEVEL 3', 'NSQ LEVEL 4', 'NSQ LEVEL 5', 'NSQ LEVEL 6', 'NSQ LEVEL 7', 'NSQ LEVEL 8']
        },
    ]);
    let [employmentData, setEmploymentData] = useState([
        {
            title: 'Are You Employed',
            type: 'select',
            value: '',
            options: ['Yes', 'No']
        },
        {
            title: 'Type Of Employment',
            type: 'select',
            value: '',
            options: ['Public', 'Private', 'NGO', 'Self Employed'],
            
        },
        {
            title: 'Name of Organisation',
            type: 'text',
            value: ''
        },
        {
            title: 'Position',
            type: 'text',
            value: ''
        },
        {
            title: 'Job Title',
            type: 'text',
            value: ''
        },
        {
            title: 'Job Description',
            type: 'text',
            value: ''
        },
        
        {
            title: 'Date Of Employment',
            type: 'date',
            value: ''
        },
        
        {
            title: 'Grade Level / Scale',
            type: 'number',
            value: ''
        },
        {
            title: 'Number Of Staff',
            type: 'number',
            value: '',
            requiredTitle: 'Type Of Employment',
            requiredValue: 'Self Employed'
        },
        {
            title: 'State Individual Staff Role',
            type: 'text',
            value: '',
            requiredTitle: 'Type Of Employment',
            requiredValue: 'Self Employed'
        },
        {
            title: 'Basic Salary',
            type: 'select',
            value: '',
            options: salaryRange(1, 400, 19)
        },
        {
            title: 'Monthly Salary',
            type: 'select',
            value: '',
            options: salaryRange(1, 500, 19)
        },
        {
            title: 'Annual Salary',
            type: 'select',
            value: '',
            options: ['Below 100,000', '101,000 - 500,000', '501,000 - 1,000,000', '1,000,000 - 5,000,000', '5,000,000 - 10,000,000', '10,000,000 - 15,000,000', '15,000,000 and above']
        },
        
        
    ]);
    let [otherEmploymentData, setOtherEmploymentData] = useState([
        [
            {
                title: 'Type Of Employment',
                type: 'select',
                value: '',
                options: ['Public', 'Private', 'NGO', 'Self Employed'],
                
            },
            {
                title: 'Name of Organisation',
                type: 'text',
                value: ''
            },
            {
                title: 'Position',
                type: 'text',
                value: ''
            },
            {
                title: 'Job Title',
                type: 'text',
                value: ''
            },
            {
                title: 'Job Description',
                type: 'text',
                value: ''
            },
            
            {
                title: 'Date Of Employment',
                type: 'date',
                value: ''
            },
            
            {
                title: 'Grade Level / Scale',
                type: 'number',
                value: ''
            },
            {
                title: 'Number Of Staff',
                type: 'number',
                value: '',
                requiredTitle: 'Type Of Employment',
                requiredValue: 'Self Employed'
            },
            {
                title: 'State Individual Staff Role',
                type: 'text',
                value: '',
                requiredTitle: 'Type Of Employment',
                requiredValue: 'Self Employed'
            },
            {
                title: 'Basic Salary',
                type: 'select',
                value: '',
                options: salaryRange(1, 400, 19)
            },
            {
                title: 'Monthly Salary',
                type: 'select',
                value: '',
                options: salaryRange(1, 500, 19)
            },
            {
                title: 'Annual Salary',
                type: 'select',
                value: '',
                options: ['Below 100,000', '101,000 - 500,000', '501,000 - 1,000,000', '1,000,000 - 5,000,000', '5,000,000 - 10,000,000', '10,000,000 - 15,000,000', '15,000,000 and above']
            },
        ]
        
        
    ]);

    let [previousEmploymentData, setPreviousEmploymentData] = useState([
        [
            {
                title: 'Type Of Employment',
                type: 'select',
                value: '',
                options: ['Public', 'Private', 'NGO', 'Self Employed'],
                
            },
            {
                title: 'Name of Organisation',
                type: 'text',
                value: ''
            },
            {
                title: 'Position',
                type: 'text',
                value: ''
            },
            {
                title: 'Job Title',
                type: 'text',
                value: ''
            },
            {
                title: 'Job Description',
                type: 'text',
                value: ''
            },
            
            {
                title: 'Date Of Employment',
                type: 'date',
                value: ''
            },
            
            {
                title: 'Grade Level / Scale',
                type: 'number',
                value: ''
            },
            {
                title: 'Number Of Staff',
                type: 'number',
                value: '',
                requiredTitle: 'Type Of Employment',
                requiredValue: 'Self Employed'
            },
            {
                title: 'State Individual Staff Role',
                type: 'text',
                value: '',
                requiredTitle: 'Type Of Employment',
                requiredValue: 'Self Employed'
            },
            {
                title: 'Basic Salary',
                type: 'select',
                value: '',
                options: salaryRange(1, 400, 19)
            },
            {
                title: 'Monthly Salary',
                type: 'select',
                value: '',
                options: salaryRange(1, 500, 19)
            },
            {
                title: 'Annual Salary',
                type: 'select',
                value: '',
                options: ['Below 100,000', '101,000 - 500,000', '501,000 - 1,000,000', '1,000,000 - 5,000,000', '5,000,000 - 10,000,000', '10,000,000 - 15,000,000', '15,000,000 and above']
            },
        ],
    ])

    let [otherQualificationData, setOtherQualificationData] = useState([
        [
            {
                title: 'Institution Attended',
                type: 'select',
                value: '',
                options: ['University', 'Polytechnic', 'College Of Education']
            },
            {
                title: 'University Attended',
                type: 'select',
                value: '',
                options: universities.map(item => item.name),
                requiredTitle: 'Institution Attended',
                requiredValue: 'University'
            },
            {
                title: 'Polytechnic Attended',
                type: 'select',
                value: '',
                options: polytechnics.map(item => item),
                requiredTitle: 'Institution Attended',
                requiredValue: 'Polytechnic'
            },
            {
                title: 'College Attended',
                type: 'select',
                value: '',
                options: colleges.map(item => item.name),
                requiredTitle: 'Institution Attended',
                requiredValue: 'College Of Education'
            },
            {
                title: 'Year Of Entry',
                type: 'date',
                value: ''
            },
            {
                title: 'Entry Mode',
                type: 'select',
                value: '',
                options: ['Sandwich', 'Part Time', 'Full Time']
            },
            {
                title: 'Matriculation Number',
                type: 'text',
                value: ''
            },
            {
                title: 'Faculty / School',
                type: 'text',
                value: ''
            },
            {
                title: 'Department',
                type: 'text',
                value: ''
            },
            {
                title: 'Course of Study',
                type: 'text',
                value: ''
            },
            {
                title: 'Year Of Graduation',
                type: 'date',
                value: ''
            },
            {
                title: 'Class Of Degree',
                type: 'select',
                value: '',
                options: [
                    'First Class',
                    'Second Class Upper',
                    'Second Class Lower',
                    'Third class',
                    'Pass',
                    'Distinction',
                    'Upper Credit',
                    'Lower Credit',
                    'Credit',
                    'Merit'
                ]
            },
            {
                title: 'Cumulative Grade Point Average (CGPA)',
                type: 'number',
                value: ''
            },
            {
                title: 'Awards',
                type: 'text',
                value: ''
            },
        ],
    ])

    async function fetchData () {
        let userRecords = await fetchUserRecords(user.uid);

        
        userRecords.employment && setEmploymentData(userRecords.employment);
        userRecords.otherEmploymentData && setOtherEmploymentData(ObjectToArray(userRecords.otherEmploymentData));
        userRecords.previousEmploymentData && setPreviousEmploymentData(ObjectToArray(userRecords.previousEmploymentData));
        userRecords.profile && setProfileData(userRecords.profile);
        userRecords.qualification && setQualificationData(userRecords.qualification);
        userRecords.otherQualificationData && setOtherQualificationData(ObjectToArray(userRecords.otherQualificationData))

    }

    useEffect(() => {
        if(user) fetchData();
    }, [user])

    useEffect(() => {
        if (activeTab === 4) {
            updateProfileData(user.uid, profileData, qualificationData, otherQualificationData, employmentData, otherEmploymentData, previousEmploymentData);
        }
    }, [activeTab]);

    let updateData = (data, index) => {
        setPreviousEmploymentData(previousEmploymentData.map((item, i) => {
            if(index !== i){
                return item;
            } else return data;
        }))
    }

    let updateOtherData = (data, index) => {
        setOtherEmploymentData(otherEmploymentData.map((item, i) => {
            if(index !== i){
                return item;
            } else return data;
        }))
    }

    let updateQualificationData = (data, index) => {
        setOtherQualificationData(otherQualificationData.map((item, i) => {
            if(index !== i){
                return item;
            } else return data;
        }))
    }

    let addPreviousEmploymentField = () => {
        
        setPreviousEmploymentData([...previousEmploymentData, [
            {
                title: 'Type Of Employment',
                type: 'select',
                value: '',
                options: ['Public', 'Private', 'NGO', 'Self Employed'],
                
            },
            {
                title: 'Name of Organisation',
                type: 'text',
                value: ''
            },
            {
                title: 'Position',
                type: 'text',
                value: ''
            },
            {
                title: 'Job Title',
                type: 'text',
                value: ''
            },
            {
                title: 'Job Description',
                type: 'text',
                value: ''
            },
            
            {
                title: 'Date Of Employment',
                type: 'date',
                value: ''
            },
            
            {
                title: 'Grade Level / Scale',
                type: 'number',
                value: ''
            },
            {
                title: 'Number Of Staff',
                type: 'number',
                value: '',
                requiredTitle: 'Type Of Employment',
                requiredValue: 'Self Employed'
            },
            {
                title: 'State Individual Staff Role',
                type: 'text',
                value: '',
                requiredTitle: 'Type Of Employment',
                requiredValue: 'Self Employed'
            },
            {
                title: 'Basic Salary',
                type: 'select',
                value: '',
                options: salaryRange(1, 400, 19)
            },
            {
                title: 'Monthly Salary',
                type: 'select',
                value: '',
                options: salaryRange(1, 500, 19)
            },
            {
                title: 'Annual Salary',
                type: 'select',
                value: '',
                options: ['Below 100,000', '101,000 - 500,000', '501,000 - 1,000,000', 'Above 1,000,000']
            },
        ]])
        
    }

    let addOtherEmploymentField = () => {
        setOtherEmploymentData([...otherEmploymentData, [
            {
                title: 'Type Of Employment',
                type: 'select',
                value: '',
                options: ['Public', 'Private', 'NGO', 'Self Employed'],
                
            },
            {
                title: 'Name of Organisation',
                type: 'text',
                value: ''
            },
            {
                title: 'Position',
                type: 'text',
                value: ''
            },
            {
                title: 'Job Title',
                type: 'text',
                value: ''
            },
            {
                title: 'Job Description',
                type: 'text',
                value: ''
            },
            
            {
                title: 'Date Of Employment',
                type: 'date',
                value: ''
            },
            
            {
                title: 'Grade Level / Scale',
                type: 'number',
                value: ''
            },
            {
                title: 'Number Of Staff',
                type: 'number',
                value: '',
                requiredTitle: 'Type Of Employment',
                requiredValue: 'Self Employed'
            },
            {
                title: 'State Individual Staff Role',
                type: 'text',
                value: '',
                requiredTitle: 'Type Of Employment',
                requiredValue: 'Self Employed'
            },
            {
                title: 'Basic Salary',
                type: 'select',
                value: '',
                options: salaryRange(1, 400, 19)
            },
            {
                title: 'Monthly Salary',
                type: 'select',
                value: '',
                options: salaryRange(1, 500, 19)
            },
            {
                title: 'Annual Salary',
                type: 'select',
                value: '',
                options: ['Below 100,000', '101,000 - 500,000', '501,000 - 1,000,000', 'Above 1,000,000']
            },
        ]])
    }

    let addOtherQualificationField = () => {
        setOtherQualificationData([...otherQualificationData, [
            {
                title: 'Institution Attended',
                type: 'select',
                value: '',
                options: ['University', 'Polytechnic', 'College Of Education']
            },
            {
                title: 'University Attended',
                type: 'select',
                value: '',
                options: universities.map(item => item.name),
                requiredTitle: 'Institution Attended',
                requiredValue: 'University'
            },
            {
                title: 'Polytechnic Attended',
                type: 'select',
                value: '',
                options: polytechnics.map(item => item),
                requiredTitle: 'Institution Attended',
                requiredValue: 'Polytechnic'
            },
            {
                title: 'College Attended',
                type: 'select',
                value: '',
                options: colleges.map(item => item.name),
                requiredTitle: 'Institution Attended',
                requiredValue: 'College Of Education'
            },
            {
                title: 'Year Of Entry',
                type: 'date',
                value: ''
            },
            {
                title: 'Entry Mode',
                type: 'select',
                value: '',
                options: ['Sandwich', 'Part Time', 'Full Time']
            },
            {
                title: 'Matriculation Number',
                type: 'text',
                value: ''
            },
            {
                title: 'Faculty / School',
                type: 'text',
                value: ''
            },
            {
                title: 'Department',
                type: 'text',
                value: ''
            },
            {
                title: 'Course of Study',
                type: 'text',
                value: ''
            },
            {
                title: 'Year Of Graduation',
                type: 'date',
                value: ''
            },
            {
                title: 'Class Of Degree',
                type: 'select',
                value: '',
                options: [
                    'First Class',
                    'Second Class Upper',
                    'Second Class Lower',
                    'Third class',
                    'Pass',
                    'Distinction',
                    'Upper Credit',
                    'Lower Credit',
                    'Credit',
                    'Merit'
                ]
            },
            {
                title: 'Cumulative Grade Point Average (CGPA)',
                type: 'number',
                value: ''
            },
            {
                title: 'Awards',
                type: 'text',
                value: ''
            },
        ]])
    }

    let renderTabs = () => {
        if(activeTab === 1){
            return <ProfileForm setData={setProfileData} data={profileData} />
        } else if (activeTab === 2){
            return <>
               
                {otherQualificationData.map((item, i) => {
                    return <OtherQualificationForm updateData={updateQualificationData} data={item} index={i} key={i} />
                })}
                <div className="col-12">
                    <Button onClick={addOtherQualificationField} variant="success" className="mt-3">Add Another Qualification</Button>

                </div>
                <QualificationForm setData={setQualificationData} data={qualificationData} addSkill={addSkill} />
            </>
        } else if(activeTab === 3){
            return <>
                <EmploymentForm setData={setEmploymentData} data={employmentData} />
                {otherEmploymentData.map((item, i) => {
                    return <OtherEmploymentForm updateData={updateOtherData} data={item} index={i} key={i} />
                })}
                <Button onClick={addOtherEmploymentField} variant="success" className="mt-3">Add Other Jobs/Source of Income</Button>
                {previousEmploymentData.map((item, i) => {
                    return <PreviousEmploymentForm updateData={updateData} data={item} index={i} key={i} />
                })}

                <Button onClick={addPreviousEmploymentField} variant="success" className="mt-3">Add Another Previous employment Field</Button>
            </>
        } else {
            return <>
            <h1>Your Data has been saved</h1>
            </>
        }
    }

    let addSkill = () => {
        setQualificationData([...qualificationData, {
            title: `Skill ${skillsAdded} Acquired`,
            type: 'text',
            value: '',
        },
        {
            title: `Enter Skill ${skillsAdded} Level`,
            type: 'select',
            value: '',
            options: ['NSQ LEVEL 0', 'NSQ LEVEL 1', 'NSQ LEVEL 2', 'NSQ LEVEL 3', 'NSQ LEVEL 4', 'NSQ LEVEL 5', 'NSQ LEVEL 6', 'NSQ LEVEL 7', 'NSQ LEVEL 8']
        }])
        setSkillsAdded((skillsAdded+1))
    }

    const validateEntries = () => {
        return false;
    }

    

    let navigateTabs = (direction) => {
        if(direction === 'back') {
            if(activeTab === 1)  return 0;
            setActiveTab(activeTab-1);
        } else {
            setActiveTab(activeTab+1);
        }

    }
    
    return (
        <MainLayout>
            <Header />

            <div class="py-4" style={{margin: '20px'}}>
                <div class="container mx-auto col-md-8">
                
                    <div class="row">
                    {renderTabs() }
                    <div className="col-12 d-flex justify-content-between">
                        {activeTab === 4? 
                            <Button onClick={() => navigate("/")} variant="success" className="mt-3">Go Back Home</Button>
                            :
                            <>
                            <Button onClick={() => navigateTabs("back")} variant="secondary" className="mt-3" disabled={activeTab === 1? true : false}>
                                <FaArrowLeft style={{marginRight: 5}}/>
                                    Previous
                                </Button>
                                <Button onClick={() => navigateTabs("front")} variant="primary" className="mt-3">
                                    {activeTab === 3? "Save Details" : "Next"}
                                    <FaArrowRight style={{marginLeft: 5}} />
                            </Button>
                            </>
                        }
                        
                    </div>
                    </div>
                </div>
            </div>
            
            
        </MainLayout>
    )
}