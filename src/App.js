import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import InstructorDashboard from './component/InstructorDashboard';
import Students from './component/Students';
import StudentList from './component/StudentList';
import StudentDetails from './component/StudentDetails';
import TousLesCours from './component/TousLesCours';
import PaymentPage from './component/PaymentPage';
import TousLesCoachs from './component/TousLesCoachs';
import ListUsers  from './component/ListUsers';

import MainLayout from './component/MainLayout';
import AddCourse from './component/AddCourse';
import AddCategorie from './component/AddCategorie';
import ListCategorie from './component/ListCategorie';
import ListCourse from './component/ListCourse';
import Addcoach from './component/Addcoach';
import ListCoach from './component/ListCoach';
import LoginUser from './component/LoginUser';
import AddUser from './component/AddUser';
import Accueil from './component/Accueil';
import CoachProfile from './component/CoachProfile';
import CourseDetails from './component/CourseDetails';


import UserProfile from './component/UserProfile';
import MesFavoris from './component/MesFavoris';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
  <Routes>
    {/*Kn theb tajoute haja b hedear w footer thotha houni*/}
    <Route path="/instructor-dashboard" element={<InstructorDashboard/>}/>
    <Route path="/students" element={<Students/>}/>
    <Route path="/studentlist" element={<StudentList/>}/>
    <Route path="/studentdetails" element={<StudentDetails/>}/>
<Route path="/addcat" element= {<AddCategorie/>}/>
<Route path="/addCourse" element={<AddCourse/>}/>
<Route path="/listCat" element={<ListCategorie/>}/>
<Route path="/listcours" element={<ListCourse/>}/>
<Route path="/edit-course/:id" element={<AddCourse />} />
<Route path="/addcoach" element={<Addcoach/>}/>
<Route path="/listcoach" element={<ListCoach/>} />
<Route path="/edit-coach/:id" element={<Addcoach />} />
<Route path="/" element={<Accueil/>}/>
<Route path="/conxuser" element={<LoginUser />}/>
<Route path="/tous-les-cours" element={<TousLesCours />} />
<Route path="/coach-profile/:id" element={<CoachProfile />} />
<Route path="/course-details/:id" element={<CourseDetails />} />
<Route path="/profil" element={<UserProfile />} />
<Route path="/mes-favoris" element={<MesFavoris />} />
<Route path="/paiement" element={<PaymentPage />} />
<Route path="/listusers" element={<ListUsers />} />
<Route path="/accueil" element={<Accueil />} />

<Route path="/tous-les-coachs" element={<TousLesCoachs />} />


    <Route element={<MainLayout/>}>

    </Route>
       {/*Kn theb tajoute haja meghir  hedear w footer thotha houni*/}

    <Route path="/loginAdmin" element={<Login/>}/>
<Route path="/loginuser" element={<LoginUser/>}/>
<Route path="/register" element={<AddUser />}/>
  
  </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
