import Course from "../Course/Course.js"
import './CourseContainer.css'
import '../../utils.css'
import React, {useEffect} from 'react'

import { useSelector } from 'react-redux'

const CourseContainer = () => {
    const search = useSelector(state => state.search)
    const condition = (co) => (co.nombre.toLowerCase().includes(search.toLowerCase()))
    let coursesList=[];
    useEffect(()=>{
      console.log ("componete fue montado")
      fectchTask()
      
  })

  const fectchTask = () => {
      fetch('/courses')
          .then(res => res.json())
          .then(data => {console.log(data)})
  }
    return (
        <div className="course-container">
          holas
        </div>

    )
}

export default CourseContainer
