import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';

// import top level route components
import Home from './pages/Home';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reset from './pages/Reset';
import Jobs from "./pages/Jobs";
import Connections from "./pages/Connnections";
import User from "./pages/User";
import Job from "./pages/Job";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import EditProfile from "./pages/EditProfile";
import Admin from "./pages/Admin";
import AdminUsers from "./pages/AdminUsers";
import AdminPosts from "./pages/AdminPosts";
import AdminJobs from "./pages/AdminJobs";
import Post from "./pages/Post";
import Search from "./pages/Search";
import AdminSearch from "./pages/AdminSearch";


// import Dashboard from './pages/dashboard';
// import FormPage from './pages/form';
// import AdminPage from './pages/admin';
// import TablePage from "./pages/table";

function App() {
  return (
    <HashRouter>
        <Routes>
          
        <Route path='/' element={<Home/> }/>
        <Route path='/jobs' element={<Jobs/> }/>
        <Route path='/search/:query' element={<Search />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/reset' element={<Reset />} />
        <Route path='/connection' element={<Connections />} />
        <Route path='/user/:id' element={<User />} />
        <Route path='/job/:id' element={<Job />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/privacy-policy' element={<Privacy />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/users' element={<AdminUsers />} />
        <Route path='/admin/posts' element={<AdminPosts />} />
        <Route path='/admin/jobs' element={<AdminJobs />} />
        <Route path='/admin/search' element={<AdminSearch />} />
        {/* <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/form' element={<FormPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/records" element={<TablePage /> } /> */}
        </Routes>   
    </HashRouter>
  );
}

export default App;
