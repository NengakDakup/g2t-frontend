import react, {useState, useEffect} from 'react';
import { Form, Modal} from 'react-bootstrap'
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { createJobPost, uploadItemImage } from '../../firebase';

import ObjectToArray from '../../utils/ObjectToArray';

export default function CreateJobPost({modalShow, setModalShow, data}) {

    
    const [file, setFile] = useState()
    const [uploading, setUploading] = useState(false)
    const [postUploading, setPostUploading] = useState(false)

    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [level, setLevel] = useState('')
    const [employmentType, setEmploymentType] = useState('')
    const [location, setLocation] = useState('')
    const [requirements, setRequirements] = useState('')
    const [applicationLink, setApplicationLink] = useState('')
    const [image, setImage] = useState([])
    const [companyImage, setCompanyImage] = useState('')
    const [companyName, setCompanyName] = useState('')


    useEffect(() => {
        if(data.id && data.title){
            console.log('data', data)
            
            setTitle(data.title)
            setOverview(data.overview)
            setLevel(data.level)
            setEmploymentType(data.employmentType)
            setLocation(data.location)
            setRequirements(data.requirements)
            setApplicationLink(data.applicationLink)
            setImage(data.image)
            setCompanyImage(data.companyImage)
            setCompanyName(data.companyName)
        } else {
            setTitle('')
            setOverview('')
            setLevel('')
            setEmploymentType('')
            setLocation('')
            setRequirements('')
            setApplicationLink('')
            setImage('')
            setCompanyImage('')
            setCompanyName('')
        }
    }, [data])

    async function uploadPostImage(){
        if(!file) return;
        
        setUploading(true)
        let res = await uploadItemImage(file, `/posts/${Math.random().toString(36).substr(2, 9)}`)
        setImage(res)
        setUploading(false)
        toast('Image Updated', {
            position: "top-center",
            type: "success"
        });
    }

    const removeImage = () => {
        setImage('')
    }
    
    async function submitPost(){
        setPostUploading(true)
        let post = {
            id: data.id || Math.random().toString(36).substr(2, 9),
            title: title,
            overview: overview,
            level: level,
            employmentType: employmentType,
            location: location,
            requirements: requirements,
            applicationLink: applicationLink,
            image: image,
            companyImage: companyImage,
            companyName: companyName,
            date: data.date || Date.now()
        }
        let res = await createJobPost(post);
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
              Create / Edit Job Posting
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => e.preventDefault()}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Job Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Job Overview</Form.Label>
                    <Form.Control as="textarea" placeholder="Enter Job Overview" value={overview} onChange={(e) => setOverview(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Job Emplyment Type (Full time / Part Time etc.)</Form.Label>
                    <Form.Control type="text" placeholder="Enter Job Emplyment type" value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Job Requirements</Form.Label>
                    <Form.Control as="textarea" placeholder="Enter Job Requiremtns" value={requirements} onChange={(e) => setRequirements(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Job Level (Senior / Junior etc.)</Form.Label>
                    <Form.Control type="text" placeholder="Enter Job Level" value={level} onChange={(e) => setLevel(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Job Location (Remote / Physical Location e.g Lagos, Nigeria)</Form.Label>
                    <Form.Control type="text" placeholder="Enter Job Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Job Application Link / Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter link to apply for job" value={applicationLink} onChange={(e) => setApplicationLink(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Job Company Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Company's Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Job Company Logo (Link)</Form.Label>
                    <Form.Control type="text" placeholder="Enter Link to Company's Logo" value={companyImage} onChange={(e) => setCompanyImage(e.target.value)} />
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
                            {image && 
                                <div className='col-md-4 col-6 p-2'>    
                                    <img className='img-fluid' src={image}></img>
                                    <button onClick={() => removeImage()} className='btn btn-danger' style={{position: 'absolute', top: 0, left: 0}}><i className='feather-x'></i></button>
                                </div>
                            }
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
  