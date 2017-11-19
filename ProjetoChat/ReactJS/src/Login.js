import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class Login extends Component  {

  constructor(props) {
    super(props)
    this.state = {
      success: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    axios.post('http://localhost:3001/auth', {name: this.name.value})
    .then( out => {
      const token = out.data.token
      window.localStorage.setItem('token', token)
      this.setState({success: true})
    })
    .catch( e => console.log(e))

    e.preventDefault()
  }

  render() {
    if(this.state.success) {
      return <Redirect to='/rooms' />
    }
    return (
      <div className="App">
      <div className="container-2 w-container">
      <form className="lobby" method="post" onSubmit={this.handleSubmit}>
        <h1 className="heading">Seja bem-vindo</h1>
        <div>Informe seu nome para começar:</div>
        <input required ref={ ref => this.name = ref} name="name" style={{outline:0, width: "100%"}} className="div-block-3" type="text"  maxLength="30" /><br />
        <button className="w-button">Entrar</button>
      </form>
      </div>
      </div>
    )
  }
    
}

export default Login  