import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from "./pages/Home/Home";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login.js";
import Register from "./pages/Register/Register.js";
import Header from "./components/Header/Header";
import CreateCourse from "./pages/CreateCourse/CreateCourse";
import CoursePage from "./pages/CoursePage/CoursePage.js";
import Profile from "./pages/Profile/Profile.js"
import EditProfile from "./pages/EditProfile/EditProfile.js"
import MyCourses from "./pages/MyCourses/MyCourses.js"
import CreateTask from "./pages/CreateTask/CreateTask";


const App = () => {
  const [user, setuser] = useState({});

  useEffect(() => {
    
  }, [])

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/editprofile">
          <EditProfile />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/crear">
          <CreateCourse user={user} />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/:topic">
          <CoursePage />
        </Route>
        <Route exact path="/:topic/taskcreate">
          <CreateTask />
        </Route>
        <Route exact path="/mycourses">
          <MyCourses />
        </Route>
        <Route exact path="/">
          {user === undefined ? <Home /> : <Main user={user} />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;