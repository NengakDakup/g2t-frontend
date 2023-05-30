import React, { useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { Alert } from "react-bootstrap";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from 'react-toastify'
import { auth, signIn } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import MainLayout from "../components/layouts/MainLayout";

export default function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setError] = useState("");
    const [user, loading, error] = useAuthState(auth);  
    const [authLoading, setAuthLoading] = useState(false);  

    let navigate = useNavigate('');

    useEffect(() => {
        if (loading) {
          // maybe trigger a loading screen
          return;
        }
        if (user) navigate("/");
      }, [user, loading]);

    async function login(){
        setError(null)
        setAuthLoading(true)
        if(!email){
            setAuthLoading(false)
            setError("Please Enter Your Email Address");
        } else if(!password){
            setAuthLoading(false)
            setError("Please Enter Your Password");
        } else {
            let res = await signIn(email, password);
            setAuthLoading(false)
            if(res.error){
                toast(res.error, {
                    position: "top-center",
                    type: "error"
                });
            }
        }
    }

    return (
        <MainLayout>
            <div className="container">
                <div className="row justify-content-center align-items-center d-flex vh-100">
                    <div className="col-md-4 mx-auto">
                        <div className="osahan-login py-4">
                            <div className="text-center mb-4">
                                <Link to="/"><img src="./img/logo.png" alt="" className="img-fluid" width={50} /></Link>
                                <h5 className="font-weight-bold mt-3">Log in to Your Account Here🚀</h5>
                            </div>
                            {err && 
                                <Alert variant='danger'>
                                    {err}
                                </Alert>
                            }
                            <form action="">
                                <div className="form-group">
                                    <label className="mb-1">Email</label>
                                    <div className="position-relative icon-form-control">
                                        <i className="feather-user position-absolute"></i>
                                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="mb-1">Password</label>
                                    <div className="position-relative icon-form-control">
                                        <i className="feather-unlock position-absolute"></i>
                                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                                </div>
                                <button disabled={authLoading} className="btn btn-primary btn-block text-uppercase" type="submit" onClick={(e) => {e.preventDefault();login()}}>
                                    {!authLoading && 'Sign in'}
                                    <PulseLoader loading={authLoading} color="#fff" />
                                </button>
                                
                                <div className="py-3 d-flex align-item-center">
                                    <Link to="/reset">Forgot password?</Link>
                                    <span className="ml-auto">
                                        New to G2T?
                                        <Link className="font-weight-bold" to="/signup"> Join now</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}