import { useEffect, useState } from 'react';
import {Table} from 'react-bootstrap';
import { fetchRecords } from '../firebase';

import Card from "../components/card/Card"
import Header from "../components/Header"
import MainLayout from "../components/layouts/MainLayout"
import AdminLayout from "../components/layouts/AdminLayout"
import Popup from '../components/modals/modal';




export default function AdminUsers(){
    let [profiles, setProfiles] = useState([]);
    let [profilesQuery, setProfilesQuery] = useState([]);
    let [query, setQuery] = useState('');
    const [lgShow, setLgShow] = useState(false);
    const [modalData, setModalData] = useState({}); 

    useEffect(() => {
        
        if(query.length > 0){
            filterData();
        }
    }, [query]);

    useEffect(() => {
        load();
    }, [])

    async function load(){
        let res = await fetchRecords();
        setProfiles(res);
        
    }

    function filterData(){
        let res = profiles.filter(item => {
            let bool = item.profile[0].value.toString().toLowerCase().includes(query.toString().toLowerCase());
            return bool;
        });

        setProfilesQuery(res);
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
                    <h1>Users</h1>
                    <Card>
                            {profiles.length < 1? 
                                <p>Loading...</p> :
                                
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
                                        <th>Cumulative Grade Point Average (CGPA)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {query.length > 1? 
                                            profilesQuery.map((item, i) => {
                                                return <tr key={i} onClick={() => showRecord(item)} style={{cursor: 'pointer'}}>
                                                    <td>{++i}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            }) :

                                            profiles.map((item, i) => {
                                                console.log(item)
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
                                                    <td>{item?.profile?.find(data => data.title === "Cumulative Grade Point Average (CGPA)").value || 'Nill'}</td>
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