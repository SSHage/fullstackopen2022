const Header =({course}) => {
  return(
    <div>
      <h1>
        {course}
      </h1>
    </div>
  )
}

const Content = ({parts}) => {
  console.log(parts[0].name)
  return(
    <div>
      <div>
        {parts[0].name}: {parts[0].exercises}
      </div>
      <div>
        {parts[1].name}: {parts[1].exercises}
      </div>
      <div>
        {parts[2].name}: {parts[2].exercises}
      </div>
    </div>
  )
}

const Total = ({totalNo}) => {
  return (
    <div>
      Number of exercises: {totalNo}
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  console.log(course.parts[0])

  return (
    <div>
      <Header course={course.name} />
      <Content parts = {course.parts} />
      <Total totalNo = {course.parts[0].exercises+course.parts[1].exercises + course.parts[2].exercises}/>
    </div>
  )
}

export default App