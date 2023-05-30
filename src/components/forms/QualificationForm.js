import react, {useState} from 'react';
import {Form, Row, Col, Button } from 'react-bootstrap';

export default function QualificationForm({setData, data, addSkill, disabled}){
    
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
                return <Form.Control value={item.value} disabled={disabled} type={item.type} placeholder={`Enter ${item.title}`} onChange={(e) => updateItem(index, e.target.value)} />
            case 'select':
                return <Form.Select disabled={disabled} onChange={(e) => updateItem(index, e.target.value)} className="form-control">
                            {item.options.map((_item, i) => {
                                if(i==0){
                                    return <><option>Select</option><option selected={item.value === _item} key={i}>{_item}</option></>
                                } else return <option selected={item.value === _item} key={i}>{_item}</option>
                                
                            })}
                        </Form.Select>
        
            default:
                return <Form.Control value={item.value} disabled={disabled} type={item.type} placeholder={`Enter ${item.title}`} onChange={(e) => updateItem(index, e.target.value)} />
        }
    }

    return (
            <Form.Group className="mb-3">
                <h1>Skills</h1>
                <Row className="mb-3">
                {data.map((item, index) => {
                        if(item.requiredTitle){
                            
                            let requiredValue = data.find(element => element.title == item.requiredTitle).value;

                            console.log('rtitle', requiredValue);
                            if(requiredValue === item.requiredValue){
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
                    {!disabled && <Button onClick={addSkill} variant="success" className="mt-3">Add Another Skill</Button>}

                </Row>
            </Form.Group>
    
    )
}