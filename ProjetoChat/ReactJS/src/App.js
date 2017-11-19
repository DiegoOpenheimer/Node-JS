import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './Login'
import Rooms from './Rooms'



class App extends Component {
  render() {
    return (
    <Router>
      <div>
      
        <Route path='/' exact component={Login}/>
        <Route path='/rooms' component={Rooms} />
      </div>
    </Router>
    )
  }
}

export default App
