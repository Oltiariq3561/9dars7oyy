import React from 'react'
import TodoApp from './components/TodoApp.jsx'
import SignupForm from './components/Formik.jsx'
import Chart from './components/Chart.jsx'
function App() {
  return (
    <div>
      <TodoApp><h1></h1></TodoApp>
       <SignupForm></SignupForm>
       <Chart></Chart>
    </div>
  )
}

export default App