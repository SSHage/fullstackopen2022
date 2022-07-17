import React from "react"

const Course =({course}) => {
    const total = course.parts.reduce((a,b) => a + b.exercises ,0) //a is initial value
    console.log({course})

    return(
      <div>
        <Header course = {course.name}/>
        <Content parts = {course.parts} />
        <Total sum = {total} />
      </div>
    )
  }

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    parts.map(part => <p key ={part.id}>{part.name} {part.exercises}</p>)
  )
}


export default Course