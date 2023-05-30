import { useEffect, useState } from 'react';
import {Table} from 'react-bootstrap';

import Card from "../components/card/Card"
import Header from "../components/Header"
import MainLayout from "../components/layouts/MainLayout"
import AdminLayout from "../components/layouts/AdminLayout"
import CreatePost from '../components/modals/CreatePost';
import { deletePost, fetchPosts } from '../firebase';
import { Link } from 'react-router-dom';




export default function AdminPosts(){
    const [modalShow, setModalShow] = useState(false);
    const [posts, setPosts] = useState([]);

    const [modalData, setModalData] = useState({})

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData(){
        let res = await fetchPosts();
        setPosts(res)
    }

    const showModal = () => {
        setModalData({})
        setModalShow(true)
    }

    const showRecord = (data) => {
        setModalData(data);
        setModalShow(true)
    }

    const handleDelete = async (id) => {
        var proceed = window.confirm("Are you sure you want to Delete?");
        if(proceed){
            let res = await deletePost(id);
            window.location.reload();
        } else return;
    }


    return (
        <MainLayout>
            <CreatePost modalShow={modalShow} setModalShow={setModalShow} data={modalData} />
        <Header />

        
        <AdminLayout>
            <div className="row">
                <div className='col-12'>
                    <h1>Posts</h1>
                    <button className='btn btn-primary' onClick={showModal}>
                        Create New Post
                        <i className='feather-plus-circle ml-2'></i>

                    </button>
                    <Card>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Post Title</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((item, i) => {
                                    return <tr key={i} >
                                            <td>{++i}</td>
                                            <td>{item.title}</td>
                                            <td>
                                                <Link to={`/post/${item.id}`} className='btn btn-secondary mr-2' ><i className='feather-eye'></i></Link>
                                                <button className='btn btn-primary mr-2' onClick={() => showRecord(item)}><i className='feather-edit'></i></button>
                                                <button className='btn btn-danger' onClick={() => {handleDelete(item.id)}}><i className='feather-trash'></i></button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                    </Card>
                </div>
               
            </div>
        </AdminLayout>
    </MainLayout>
    )
}