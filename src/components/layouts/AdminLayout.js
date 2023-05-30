import { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom"
import UserContext from "../../context/UserContext";
import { logout, auth } from "../../firebase";


export default function AdminLayout({children}){
    const navigate = useNavigate()
    const [user, loading, error] = useAuthState(auth);
    
    const userData = useContext(UserContext);

    useEffect(() => {
        if(userData.uid){
            if(!userData.admin){
                navigate('/login')
            }
        }

    }, [userData])

    async function signOut(){
        localStorage.removeItem('userData')
        await logout();
        navigate("/login")
    }

    return (
        <div class="py-4">
            <div class="container mx-auto col-md-8">
            {userData.admin? 
                <div class="row">
                    <div class="col-md-3">
                    <div class="mb-3 border rounded list-sidebar overflow-hidden">
                        <div class="box-title p-3 border-bottom">
                            <h6 class="m-0">Admin Panel</h6>
                        </div>
                        {}
                        <ul class="list-group list-group-flush">
                            <li>
                                <Link class="p-3 d-inline-block w-100 border-bottom text-muted" to="/admin">Graphs</Link>
                            </li>
                            <li>
                                <Link class="p-3 d-inline-block w-100 border-bottom text-muted" to="/admin/users">Users</Link>
                            </li>
                            <li>
                                <Link class="p-3 d-inline-block w-100 border-bottom text-muted" to="/admin/posts">Posts</Link>
                            </li>
                            <li>
                                <Link class="p-3 d-inline-block w-100 border-bottom text-muted" to="/admin/jobs">Jobs</Link>
                            </li>
                            <li>
                                <Link class="p-3 d-inline-block w-100 border-bottom text-muted" to="/admin/search">Advanced Search</Link>
                            </li>
                            <li>
                                <Link class="p-3 d-inline-block w-100 border-bottom text-muted" to="#" onClick={signOut}>Log Out</Link>
                            </li>
                           
                        </ul>
                    </div>
                    </div>
                    <div class="col-md-9">
                    {children}
                    </div>
                </div>

                : 'Loading...'
                }
            </div>
        </div>
    )
}