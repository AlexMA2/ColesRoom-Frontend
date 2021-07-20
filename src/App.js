import "./App.css";
import React, { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";

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
import CreateTask from "./pages/CreateTask/CreateTask.js"

import { useSelector } from 'react-redux'
import { setUser } from "./redux/actionCreators/AC";

const App = () => {
  const [user, setuser] = useState('');
  const userredux = useSelector(state => state.user)

  useEffect(() => {
    console.log(user)
    if (sessionStorage.getItem("user") !== null) {
      // Restaura el contenido al campo de texto
      console.log(sessionStorage.getItem("user"))
      setuser(sessionStorage.getItem("user"))
      console.log(user)
    }
    else {
      setuser('')
    }

  }, [userredux]);

  return (
    <Router>
      <Header user={user} />
      {
        user === ''
          ? 
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/">
              <Redirect to="/" />
            </Route>
          </Switch>
          : 
          <Switch>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/profile/edit">
              <EditProfile />
            </Route>
            <Route exact path="/mycourses">
              <MyCourses />
            </Route>
            <Route exact path="/mycourses/crear">
              <CreateCourse user={user} />
            </Route>
            <Route exact path="/mycourses/:topic">
              <CoursePage />
            </Route>
            <Route exact path="/mycourses/:topic/taskcreate">
              <CreateTask />
            </Route>
            <Route exact path="/">
              <Main user={user} />
            </Route>
            <Route path="/">
              <Redirect to="/" />
            </Route>
          </Switch>
      }      
    </Router>
  );
};

export default App;
