import { useState } from 'react'

const Feedback = () => {
  return (
    <div>
      <h1> Please give feedback below</h1>
    </div>

  )
}

const Button =({handleClick,text}) => {
  return(
    <button onClick = {handleClick}>
      {text}
    </button>
  )
}

const StatisticsHeader = () => {
  return(
    <div>
      <h1>
        Statistics
      </h1>
    </div>
  )
}

const Statistics =(props) => {
  return (
    <tr>
      <td>
      {props.text} 
      </td>
      <td> 
        {props.number} {props.symbol}
      </td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback />
      <Button handleClick = {() => setGood(good+1)} text = 'good'/>
      <Button handleClick = {() => setNeutral(neutral+1)} text = 'neutral'/>
      <Button handleClick = {() => setBad(bad+1)} text = 'bad'/>
      <StatisticsHeader />
      <table>
      <Statistics text = 'Good' number = {good} />
      <Statistics text = 'Neutral' number = {neutral} />
      <Statistics text = 'Bad' number = {bad} />
      <Statistics text = 'Total' number = {good + neutral + bad} />
      <Statistics text = 'Average' number = {(good-bad)/(good+neutral+bad)} />
      <Statistics text = 'Positive' number = {good/(good+neutral+bad)*100} symbol = '%' />
      </table>
    </div>
  )
}

export default App