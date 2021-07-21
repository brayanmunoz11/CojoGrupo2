import "./App.css";
import React, { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home.js"
import Main from "./pages/Main/Main.js"
import Login from "./pages/Login/Login.js"
import Register from "./pages/Register/Register.js"
import Header from "./components/Header/Header.js"
import CreateCourse from "./pages/CreateCourse/CreateCourse.js"
import CoursePage from "./pages/CoursePage/CoursePage.js"
import Profile from "./pages/Profile/Profile.js"
import EditProfile from "./pages/EditProfile/EditProfile.js"
import MyCourses from "./pages/MyCourses/MyCourses.js"
import CoursesCreated from "./pages/CoursesCreated/CoursesCreated.js"
import CreateTask from "./pages/CreateTask/CreateTask.js"

import { useSelector } from 'react-redux'

const App = () => {
  const [user, setuser] = useState('');
  const userredux = useSelector(state => state.user)

  useEffect(() => {     
    if (sessionStorage.getItem("user") !== null) {
      setuser(sessionStorage.getItem("user"))
    }    
    else {
      setuser('')
    }

  }, [user, userredux]);
    
  return (
    <Router>
      <Header user={user}/>
      <Switch>        
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/profile/edit">
          <EditProfile />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>        
        <Route exact path="/mycourses">
          <MyCourses />
        </Route>
        <Route exact path="/coursescreated">
          <CoursesCreated/>
        </Route>
        <Route exact path="/CreateCourse">
          <CreateCourse/>
        </Route>
        <Route exact path="/mycourses/:topic">
          <CoursePage/>
        </Route>
        <Route exact path="/mycourses/:topic/taskcreate">
          <CreateTask/>
        </Route>
        <Route exact path="/">
          {user === '' ? <Home /> : <Main/>}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
