import Course from "../Course/Course.js"
import './CourseContainer.css'
import '../../utils.css'
import React, { Component } from 'react'

class CourseContainer extends Component {
  constructor(valor) {
    super();
    this.state = {
      coursesList: [],
      valor: valor
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
    this.fetchCourses()
    this.fetchCourseCreated()
    this.fetchMyCourses()
  }

  async fetchCourseCreated() {
    const res = await fetch(`api/courses/created/${sessionStorage.getItem("user")}`)
    const data = await res.json()
    return data
  }

  async fetchMyCourses() {
    const res = await fetch(`api/courses/join/${sessionStorage.getItem("user")}`)
    const data = await res.json()
    return data
  }

  fetchCourses() {
    var URLactual = window.location.href;
    var desicion = URLactual.substring(23)
    if (desicion === "/") {
      fetch('/api/courses')
        .then(res => res.json())
        .then(data => {
          this.setState({ coursesList: data });
        });
    } else if (desicion === "/mycourses") {
      console.log(this.state.valor.valor)
      if (this.state.valor.valor === "cc") {
        this.fetchCourseCreated().then(data => {
          this.setState({ coursesList: data })
        })
      } else if (this.state.valor.valor === "cu") {
        this.fetchMyCourses().then(data => {
          this.setState({ coursesList: data })
        })
      }
    }
  }

  render() {
    return (
      <div className="course-container">
        <div className="grid-courses">
          {this.state.coursesList.map(co => (
            <Course
              curso_id={co._id}
              name={co.name}
              category={co.category}
              teacher_id={co.user_id}
              description={co.description}
              image={co.image}
              datecreate={co.datecreate}
              viewDelete={true}
            />
          ))
          }
        </div>
      </div>
    )
  }
}

export default CourseContainer

// import Course from "../Course/Course.js"
// import './CourseContainer.css'
// import '../../utils.css'

// import { useSelector } from 'react-redux'

// const CourseContainer = ({ coursesList }) => {
//     const search = useSelector(state => state.search)   

//     const condition = (co) => (co.nombre.toLowerCase().includes(search.toLowerCase()))

//     return (
//         <div className="course-container">

//             <div className="grid-courses">
//                 {
//                     coursesList.filter(condition).length
//                         ? coursesList.filter(condition).map((co) => (<Course id={co.id}
//                             curso_id={co.curso_id}
//                             name={co.nombre}
//                             category={co.categoria}
//                             teacher_id={co.user_id} />))
//                         : <h2> No hay cursos </h2>
//                 }

//             </div>
//         </div>

//     )
// }

// CourseContainer.defaultProps = {
//     filterSearch: "",
//     coursesList: []
// }


// export default 