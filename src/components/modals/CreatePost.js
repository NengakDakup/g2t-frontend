import react, {useState, useEffect, useContext} from 'react';
import { Form, Modal} from 'react-bootstrap'
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import UserContext from '../../context/UserContext';
import { createPost, uploadItemImage } from '../../firebase';

import ObjectToArray from '../../utils/ObjectToArray';

export default function CreatePost({modalShow, setModalShow, data}) {
    const userData = useContext(UserContext);
    
    const [file, setFile] = useState()
    const [uploading, setUploading] = useState(false)
    const [postUploading, setPostUploading] = useState(false)

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [images, setImages] = useState([])


    useEffect(() => {
        if(data.id && data.title && data.body && data.images){
            console.log('data', data)
            setTitle(data.title)
            setBody(data.body)
            setImages(data.images)
        } else {
            setTitle('')
            setBody('')
            setImages([])
        }
    }, [data])

    async function uploadPostImage(){
        if(!file) return;
        
        setUploading(true)
        let res = await uploadItemImage(file, `/posts/${Math.random().toString(36).substr(2, 9)}`)
        setImages([...images, res])
        setUploading(false)
        toast('Image Updated', {
            position: "top-center",
            type: "success"
        });
    }

    const removeImage = (link) => {
        let newImages = images.filter(img => img !== link);
        setImages(newImages)
    }
    
    async function submitPost(){
        setPostUploading(true)
        let post = {
            id: data.id || Math.random().toString(36).substr(2, 9),
            images: images,
            title: title,
            body: body,
            date: data.date || Date.now(),
            user: userData.admin? 'Admin' : userData.fullname,
            uid: userData.uid
        }
        let res = await createPost(post);
        setPostUploading(false)
        toast('Post Updated', {
            position: "top-center",
            type: "success"
        });
        window.location.reload();
    } 

    return (
      <>
        <Modal
          size="lg"
          show={modalShow}
          onHide={() => setModalShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Create / Edit Post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => e.preventDefault()}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Post Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Post Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Post Body</Form.Label>
                    <Form.Control as="textarea" placeholder="Enter Post Content" value={body} onChange={(e) => setBody(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formGridEmail">
                    <Form.Label>Add Image</Form.Label>
                        <div className='input-group'>
                            <input type="file" className='form-control' name="avatar" accept="image/png, image/jpeg" onChange={(e) => setFile(e.target.files[0])}></input>
                            <div className='input-group-append'>
                                <button className='btn btn-primary' onClick={uploadPostImage}>
                                    {!uploading  &&  'Upload'}
                                    <PulseLoader color='#fff' loading={uploading} />
                                </button>
                            </div>
                        </div>
                        <div className='row mt-2'>
                            {images.map(link => {
                                return (<div className='col-md-4 col-6 p-2'>    
                                    <img className='img-fluid' src={link}></img>
                                    <button onClick={() => removeImage(link)} className='btn btn-danger' style={{position: 'absolute', top: 0, left: 0}}><i className='feather-x'></i></button>
                                </div>)
                            })}
                            
                        </div>
                    
                </Form.Group>

                <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                    <button className='btn btn-primary' onClick={submitPost}>
                        {!postUploading && `Submit`}
                        <PulseLoader color='#fff' loading={postUploading} />
                    </button>
                </Form.Group>

            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  