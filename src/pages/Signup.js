import React, { useState, useEffect } from "react";
import { Link, useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signUp, checkMatric } from "../firebase";
import { Button, Form, Alert } from "react-bootstrap"
import MainLayout from "../components/layouts/MainLayout";

import universities from "../universities.json"
import colleges from "../colleges.json"
import polytechnics from "../polytechnics.json"

const axios = require('axios').default;

export default function Signup () {
    const [institionType, setInstitutionType] = useState('university')
    const [institionName, setInstitutionName] = useState('university')
    const [institionList, setInstitutionList] = useState(universities)

    const [matric, setMatric] = useState("");
    const [graduationYear, setGraduationYear] = useState("");
    const [validated, setValidated] = useState(false) 
    const [validationLoading, setValidationLoading] = useState(false)
    const [registerLoading, setRegisterLoading] = useState(false)

    const [userData, setUserData] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [err, setError] = useState("");
    const [user, loading, error] = useAuthState(auth);
    let navigate = useNavigate('');

    const register = async () => {
        setError('');
        if (!name){
            setError("Please Enter Your Name");
        } else if(!email){
            setError("Please Enter a Valid Email Address");
        } else if(!password){
            setError("Please Enter a Password");
        } else if(password.length < 6){
            setError("Password Should Be More than 6 Characters");
        } else if( !(password === confirmPassword)){
            setError("Passwords do not Match");
        }  else {
            setRegisterLoading(true)
            let res = await signUp(name, email, password, {...userData, institionName, institionType});
            setRegisterLoading(false)
            
            if(res.error){
                toast(res.error, {
                    position: "top-center",
                    type: "error"
                });
            }
        }
    };

    const validateDetails = async () => {
        setError('');
        if(!matric){
            setError("Please Enter Matric Number")
        } else if(!graduationYear){
            setError("Please Enter Graduation Year")
        } else if(!institionName){
            setError("Please Enter Institution Name")
        } else if(institionName !== 'Federal Polytechnic, Offa, Kwara State'){
            setError(`${institionName} Not supported yet`)
        }

       

         
        else {
            let access_token = '';
            setValidationLoading(true);
            // check if matric is already taken
            let matricTaken = await checkMatric(matric);
            
            if(matricTaken){
                setValidationLoading(false);
                setError('Matriculation Number Already Exists.')
                return;
            }
            
            
            // make api call to generate auth token
            axios.post('https://api.fpo.edu.ng/token', 'grant_type=password&username=fedpoffa&password=2!3$yhSku8^uBn')
            .then(function (response) {
                setValidationLoading(false);
                access_token = response.data.access_token; 
                
                // after generating auth token use it to request for user details with matric number and gradustion year 
                axios.get(`https://api.fpo.edu.ng/api/data/finalresult?MatricNo=${matric}&year=${graduationYear}`, 
                {
                    headers: { 
                        'Authorization': `Bearer ${access_token}`,
                    }
                }).then(function (response) {
                    setValidationLoading(false);
                    if(!response.data?.status){
                        setError('Student Not Found. Please Enter Valid Details');
                    } else {
                        setUserData(response.data.data)
                        setValidated(true);
                        setName(response.data.data.fullname)
                    }
                    
                }).catch(function (error) {
                    console.log(error);
                    setValidationLoading(false);
                    setError('An Error Occured.')
                  })
              })
              .catch(function (error) {
                console.log(error);
                setValidationLoading(false);
                setError('An Error Occured.')
              });


        }
    }

    useEffect(() => {
        if(institionType === 'university'){
            setInstitutionList(universities)
        } else if(institionType == 'polytechnic'){
            setInstitutionList(polytechnics)
        } else {
            setInstitutionList(colleges)
        }
    }, [institionType])

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/");
    }, [user, loading]);

    return (
        <MainLayout>
            <div className="container">
                <div className="row justify-content-center align-items-center d-flex vh-100">
                    <div className="col-md-4 mx-auto">
                        <div className="osahan-login py-4">
                            <div className="text-center mb-4">
                                <Link to="/"><img src="./img/logo.png" alt="" width={50}/></Link>
                                <h5 className="font-weight-bold mt-3">Create Your Account Here🚀</h5>
                                
                            </div>
                            {err && 
                                <Alert variant='danger'>
                                    {err}
                                </Alert>
                            }
                            <form action="">
                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label className="mb-1">Matriculation Number</label>
                                            <div className="position-relative icon-form-control">
                                                <i className="feather-user position-absolute"></i>
                                                <input type="text" className="form-control" value={matric} onChange={(e) => setMatric(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label className="mb-1">Graduation Year</label>
                                            <div className="position-relative icon-form-control">
                                                <i className="feather-calendar position-absolute"></i>
                                                <input type="number" className="form-control" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                <div className="col">
                                        <div className="form-group">
                                            <label className="mb-1">Institution Attended</label>
                                            <div className="position-relative icon-form-control">
                                                <i className="feather-align-justify position-absolute"></i>
                                                <select className="form-control" onChange={(e) => setInstitutionType(e.target.value)} >
                                                    <option value='university'>University</option>
                                                    <option value='polytechnic'>Polytechnic</option>
                                                    <option value='college'>College</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label className="mb-1">Institution Name</label>
                                            <div className="position-relative icon-form-control">
                                                <i className="feather-align-justify position-absolute"></i>
                                                <select className="form-control" onChange={(e) => setInstitutionName(e.target.value)} >
                                                   {institionList.map(data => <option value={data.name? data.name : data}>{data.name? data.name : data}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {validated && 
                                    <>
                                        <div className="form-row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label className="mb-1">Full Name</label>
                                                    <div className="position-relative icon-form-control">
                                                        <i className="feather-user position-absolute"></i>
                                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} disabled={true} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="mb-1">Email</label>
                                            <div className="position-relative icon-form-control">
                                                <i className="feather-at-sign position-absolute"></i>
                                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="mb-1">Password (6 or more characters)</label>
                                            <div className="position-relative icon-form-control">
                                                <i className="feather-unlock position-absolute"></i>
                                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="mb-1">Confirm Password (Same As Password)</label>
                                            <div className="position-relative icon-form-control">
                                                <i className="feather-unlock position-absolute"></i>
                                                <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  />
                                            </div>
                                        </div>
                                    </>
                                }
                                <div className="form-group">
                                    <label className="mb-1">By Signing Up You agree to the G2T 
                                        <a href="#userAgreement" data-toggle="modal" data-target="#userAgreement"> User Agreement</a>,
                                        <a href="#privacyPolicy" data-toggle="modal" data-target="#privacyPolicy"> Privacy Policy</a>, and
                                        <a href="#cookiePolicy" data-toggle="modal" data-target="#cookiePolicy"> Cookie Policy</a>.</label>
                                </div>
                                {
                                    !validated &&
                                    <button disabled={validationLoading} className="btn btn-primary btn-block text-uppercase" type="submit" onClick={(e) => {e.preventDefault();validateDetails()}}>
                                        {!validationLoading && 'Validate Details'}
                                        <PulseLoader loading={validationLoading} color="#fff" />
                                    </button>
                                }
                                {
                                    validated && 
                                    <button disabled={registerLoading} className="btn btn-primary btn-block text-uppercase" type="submit" onClick={(e) => {e.preventDefault();register()}}>
                                        {!registerLoading && 'Agree & Join'}
                                        <PulseLoader loading={registerLoading} color="#fff" />
                                    </button>
                                }
                                <div className="py-3 d-flex align-item-center">
                                    <Link to="/reset">Forgot password?</Link>
                                    <span className="ml-auto">
                                        Already on G2T?
                                        <Link className="font-weight-bold" to="/login"> Sign in</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}