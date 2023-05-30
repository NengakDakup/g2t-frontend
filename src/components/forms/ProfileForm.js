import react, {useState, useContext} from 'react';
import {Form, Row, Col } from 'react-bootstrap';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import UserContext from '../../context/UserContext';
import { uploadImage } from '../../firebase';
import StringToKebab from '../../utils/StringToKebab';

export default function ProfileForm({setData, data, disabled}){
    const userData = useContext(UserContext);

    const [file, setFile] = useState()
    const [uploading, setUploading] = useState(false)

    async function uploadProfileImage(){
        if(!file) return;
        if(!userData.uid) return;
        setUploading(true)
        let res = await uploadImage(file, `/profile/${userData.uid}`, userData.uid)
        setUploading(false)
        toast('Image Updated', {
            position: "top-center",
            type: "success"
        });
    }

    function updateItem(index, val){
        setData(data.map((item, i) => {
            if(i === index){
                item.value = val;
                return item;
            } else {
                return item;
            }
        }));
        
    }

    function renderInput(index, item){
        switch (item.type) {
            case 'text':
                return <Form.Control value={item.value} className={StringToKebab(item.title)} disabled={disabled} type={item.type} placeholder={`Enter ${item.title}`} onChange={(e) => updateItem(index, e.target.value)} />
            case 'select':
                return <Form.Select disabled={disabled} className={`${StringToKebab(item.title)} form-control`} onChange={(e) => updateItem(index, e.target.value)}>
                            {item.options.map((_item, i) => {
                                if(i==0){
                                    return <><option>Select</option><option selected={item.value.toLowerCase() === _item.toLowerCase()} key={i}>{_item}</option></>
                                } else return <option selected={item.value.toLowerCase() === _item.toLowerCase()} key={i}>{_item}</option>
                                
                            })}
                        </Form.Select>
        
            default:
                return <Form.Control className={StringToKebab(item.title)} value={item.value} disabled={disabled} type={item.type} placeholder={`Enter ${item.title}`} onChange={(e) => updateItem(index, e.target.value)} />
        }
    }
    
    return (
            <Form.Group className="mb-3">
                <h1>Profile</h1>
                <Row className="mb-3">
                    {!disabled &&
                        <Col className="col-12 col-md-6 mt-3" >
                            <Form.Group controlId="formGridEmail">
                            <Form.Label>Change Profile Picture</Form.Label>
                                <div className='input-group'>
                                    <input type="file" className='form-control' name="avatar" accept="image/png, image/jpeg" onChange={(e) => setFile(e.target.files[0])}></input>
                                    <div className='input-group-append'>
                                        <button className='btn btn-primary' onClick={uploadProfileImage}>
                                            {!uploading  &&  'Upload'}
                                            <PulseLoader color='#fff' loading={uploading} />
                                        </button>
                                    </div>
                                </div>
                                
                            </Form.Group>

                        </Col>
                    }
                    {data.map((item, index) => {
                        if(item.requiredTitle){
                            
                            let requiredValue = data.find(element => element.title == item.requiredTitle).value;
                            if(requiredValue.toLowerCase() === item.requiredValue.toLowerCase()){
                                return (
                                    <Col className="col-12 col-md-6 mt-3" key={index}>
                                    <Form.Group controlId="formGridEmail">
                                        <Form.Label>{item.title}</Form.Label>
                                        {renderInput(index, item)}
                                        
                                    </Form.Group>
                                    </Col>
                                )
                            }
                        } else {
                            return (
                                <Col className="col-12 col-md-6 mt-3" key={index}>
                                    <Form.Group controlId="formGridEmail">
                                        <Form.Label>{item.title}</Form.Label>
                                        {renderInput(index, item)}
                                        
                                    </Form.Group>
                                </Col>
                            )
                        }
                        
                    })}
                </Row>
            </Form.Group>
    
    )
}