import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import T4teq from './Components/T4teq'
import Registration from './Components/Registration.jsx'
import Login from './Components/Login.jsx'
import User from './Components/User.jsx'
import Task from './Components/Task'
import Add_task from './Components/Add_task'
import Admin from './Components/Admin.jsx'
import Dot from './Components/Dot.jsx';
import Employee from './Components/Employee.jsx'
import Dot_view from './Components/Dot_view.jsx'
import Profile from './Components/Profile.jsx'
import Pmpage from './Components/Pm_file.jsx'
import Seminar from './Components/Seminar.jsx'
// Skill report
import EHome from './Components/EHome.jsx'
import Eskill from './Components/Eskill.jsx';
import Eupdate from './Components/Eskillupdate.jsx'
import Einfo from './Components/Einfo.jsx';
import Elogin from './Components/Elogin.jsx'
import ChatForm from './Components/Chatform.jsx';



function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<T4teq />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dot" element={<Dot />} />
          <Route path="/employee" element={<Employee/>} />
          <Route path="/dot_view" element={<Dot_view />} />
          <Route path="/profile" element={<Profile />} />
          {/* All routers under /project_manager */}
          <Route path="/project_manager" element={<Pmpage />}>
            <Route index element={<Task />} />
            <Route path="tasks" element={<Task />} />
            <Route path="add-task" element={<Add_task/>} />
            <Route path="seminar" element={<Seminar/>} />
          </Route>
          {/* All routes under /user */}
          <Route path="/user" element={<User />}>
            <Route index element={<Task />} />
            <Route path="tasks" element={<Task />} />
            <Route path="add-task" element={<Add_task />} />
          </Route>


          {/* Skill report*/}
           <Route path="/elogin" element={<Elogin/>} />
          <Route path="/home" element={<EHome/>} />
          <Route path="/skill" element={<Eskill/>} />
          <Route path="/update" element={<Eupdate/>} />
          <Route path="/info" element={<Einfo/>} />
          <Route path="/chat" element={<ChatForm />} />
          

        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App
