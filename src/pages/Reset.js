import React,{ useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, sendPasswordReset } from "../firebase";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

import MainLayout from "../components/layouts/MainLayout";

export default function Reset () {
    let [email, setEmail] = useState("");
    let [err, setError] = useState('');
    let [resetLoading, setResetLoading] = useState(false)
    const [user, loading, error] = useAuthState(auth);
    let navigate = useNavigate('');

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/");
    }, [user, loading]);

    async function sendReset(){
        setError(null)
        if(!email){
            setError("Please Enter a Valid Email Address");
        } else {
            setResetLoading(true)
            let res = await sendPasswordReset(email);
            
            if(res.error) toast(res.error, {
                position: "top-center",
                type: "error"
            });

            if(res.message) toast(res.message, {
                position: "top-center",
                type: "success"
            });
            setResetLoading(false)
        }
    }

    return (
        <MainLayout>
            <div class="container">
                <div class="row justify-content-center align-items-center d-flex vh-100">
                    <div class="col-md-4 mx-auto">
                        <div class="osahan-login py-4">
                            <div class="text-center mb-4">
                                <Link to="/">
                                    <img src="./img/logo.png" alt="" width={50} />
                                </Link>
                                <h5 class="font-weight-bold mt-3">Oops😬. You can Reset Your Password Here</h5>
                                <p class="text-muted">Please enter your Email Address</p>
                                <p>A link will be sent to the Email Address you provide</p>
                            </div>
                            {err && 
                                <Alert variant='danger'>
                                    {err}
                                </Alert>
                            }
                            <form action="">
                                <div class="form-group">
                                    <label class="mb-1">Email Address</label>
                                    <div class="position-relative icon-form-control">
                                        <i class="feather-user position-absolute"></i>
                                        <input type="email" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email linked to Account"/>
                                    </div>
                                </div>
                                <button disabled={resetLoading} class="btn btn-primary btn-block text-uppercase" type="submit" onClick={(e) => {e.preventDefault();sendReset()}}>
                                    {!resetLoading && 'Reset Password'}
                                    <PulseLoader loading={resetLoading} color="#fff" />
                                </button>
                                <div class="py-3 d-flex align-item-center">
                                    <Link to="/login"> Sign In</Link>
                                    <span class="ml-auto"> New to G2T? 
                                    <Link class="font-weight-bold" to="/signup"> Join now</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}