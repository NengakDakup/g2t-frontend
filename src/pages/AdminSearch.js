import { useEffect, useState } from 'react';
import {Table} from 'react-bootstrap';

import Card from "../components/card/Card"
import Header from "../components/Header"
import MainLayout from "../components/layouts/MainLayout"
import AdminLayout from "../components/layouts/AdminLayout"

import { fetchRecords } from '../firebase';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import Popup from '../components/modals/modal';

import {profileData, qualificationData, employmentData, otherQualificationData} from '../data'





export default function AdminSearch(){
    const [records, setRecords] = useState([])
    const [searchFileds, setSearchFields] = useState([])
    const [searchLoading, setSearchLoading] = useState(false)

    const [fieldToSearch, setFieldToSearch] = useState('')
    const [searchType, setSearchType] = useState('exact')
    const [valueToSearch, setValueToSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])

    const [profiles, setProfiles] = useState([])

    const [lgShow, setLgShow] = useState(false);
    const [modalData, setModalData] = useState({}); 


    useEffect(() => {
        getData()
        handleSearchFields()
    }, [])

    async function getData(){
        let res = await fetchRecords();
        setRecords(res);
    }

    function handleSearchFields(){
        
        let items = [...profileData, ...qualificationData, ...employmentData, ...otherQualificationData]
        let options = [];
        items.forEach(item => options.push(item.title))
        
        setSearchFields(options);
    }

    function convertToArray(obj){
        let arr = [];
        for (const key in obj) {
            arr = [...arr, ...obj[key]]
        }
        return arr
    }

    function handleFormSubmit(){
        setSearchLoading(true)
        let recordsResult = [];
        if(fieldToSearch && searchType && valueToSearch){
            records.forEach((record, i) => {
                if(!record.profile) return;
        
                const arrData = [...record.employment, ...record.profile, ...record.qualification, ...convertToArray(record.otherEmploymentData), ...convertToArray(record.otherQualificationData), ...convertToArray(record.previousEmploymentData)]
                for(const el of arrData){
                    if(el.title.toLowerCase() === fieldToSearch.toLowerCase() && el.value.toLowerCase() === valueToSearch.toLowerCase()){
                        recordsResult.push(record)
                        return;
                    }
                }
            })
        }
        setSearchResult(recordsResult);
        setSearchLoading(false)
    }

    function showRecord(record){
        if(!record.profile) return;
        setModalData(record);
        setLgShow(true);
    }
   


    return (
        <MainLayout>
            <Popup lgShow={lgShow} setLgShow={setLgShow} data={modalData} />
        <Header />

        
        <AdminLayout>
            <div className="row">
                <div className='col-12'>
                    <h1>Advanced Search</h1>
                    <Card>
                    <form class="js-validate" novalidate="novalidate" onSubmit={(e) => {e.preventDefault(); handleFormSubmit()}}>
    
                        <div class="row">

                            <div class="col-md-4 col-sm-4 col-4 mb-3">
                                <div class="js-form-message">
                                    <div class="form-group">
                                        <label class="form-label">
                                            Field To Search
                                        </label>
                                        <select class="form-control custom-select" required="true"
                                            data-error-class="u-has-error" data-success-class="u-has-success" value={fieldToSearch} onChange={(e) => setFieldToSearch(e.target.value)}>
                                            <option value="">Select Option</option>
                                            {searchFileds.map(item => <option value={item}>{item}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-md-4 col-sm-4 col-4 mb-2">
                                <div class="js-form-message">
                                    <div class="form-group">
                                        <label class="form-label">
                                            Search Type
                                        </label>
                                        <select value={searchType} onChange={(e) => setSearchType(e.target.value)} class="form-control custom-select" required="" data-msg="Please select your gender."
                                            data-error-class="u-has-error" data-success-class="u-has-success">
                                            <option value="exact" selected="true">Exact Value / Contains</option>
                                            {/* <option value="number">Number Range</option>
                                            <option value="date">Date Range</option> */}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            

                            <div class="col-md-4 col-sm-4 col-4 mb-2">
                                <div class="js-form-message">
                                    <div class="form-group">
                                        <label class="form-label">
                                            Value To Search
                                        </label>
                                        <input value={valueToSearch} onChange={(e) => setValueToSearch(e.target.value)} type="text" class="form-control" name="location" placeholder="Enter Value" aria-label="Enter your location" required="" aria-describedby="locationLabel" data-msg="Please enter your location." data-error-class="u-has-error" data-success-class="u-has-success" />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="mb-3 text-right">
                            <button type='submit' class="font-weight-bold btn btn-primary rounded p-3" href="#" onClick={handleFormSubmit}>
                                {searchLoading? <PulseLoader color="#fff" /> : "Search"}
                            </button>
                        </div>
                    </form>
                    </Card>
                    <Card>
                        {searchResult.length < 1? 
                                <p>Not Found / No Search...</p> :
                                
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                        <th>#</th>
                                        <th>Institution Attended</th>
                                        <th>Matriculation Number</th>
                                        <th>Course Of Study</th>
                                        <th>Gender</th>
                                        <th>Contact</th>
                                        <th>Date Of Birth</th>
                                        <th>Class Of Degree</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            searchResult.map((item, i) => {
                                                return <tr key={i} onClick={() => showRecord(item)} style={{cursor: 'pointer'}}>
                                                    <td>{++i}</td>
                                                    <td>
                                                        {item?.profile?.find(data => (data.title === "Polytechnic Attended")).value || ''}
                                                        {item?.profile?.find(data => (data.title === "University Attended")).value || ''}
                                                        {item?.profile?.find(data => (data.title === "College Attended")).value || ''}
                                                    </td>
                                                    <td>{item?.profile?.find(data => data.title === "Matriculation Number").value || 'Nill'}</td>
                                                    <td>{item?.profile?.find(data => data.title === "Course of Study").value || 'Nill'}</td>
                                                    <td>{item?.profile?.find(data => data.title === "Gender").value || 'Nill'}</td>
                                                    <td>{item?.profile?.find(data => data.title === "Contact [Mobile Phone Number]").value || 'Nill'}</td>
                                                    <td>{item?.profile?.find(data => data.title === "Date Of Birth").value || 'Nill'}</td>
                                                    <td>{item?.profile?.find(data => data.title === "Class Of Degree").value || 'Nill'}</td>
                                                </tr>
                                            })

                                        }
                                        
                                    </tbody>
                                </Table>  
                            }
                    </Card>
                </div>
               
            </div>
        </AdminLayout>
    </MainLayout>
    )
}