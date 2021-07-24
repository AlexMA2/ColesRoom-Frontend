import Course from "../Course/Course.js"
import './CourseContainer.css'
import '../../utils.css'
import React, { Component } from 'react'

class CourseContainer extends Component {

  constructor() {
    super();
    this.state = {
      coursesList: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch('/courses')
      .then(res => res.json())
      .then(data => {
        
        this.setState({ coursesList: data });
      });
  }

  render() {
    return (
      <div className="course-container">
        <div className="grid-courses">
        {this.state.coursesList.map(co => (
          <Course 
            key={co._id}
            curso_id={co._id}
            name={co.name}
            category={co.category}
            teacher_id={co.user_id}
            description={co.description}
            imagen={co.description}
            image={co.image}
            datecreate={co.datecreate} />
        ))
        }
        </div>
      </div>
    )
  }
}

export default CourseContainer
