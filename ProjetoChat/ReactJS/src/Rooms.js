import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'
import SelectRoom from './SelectRoom'
import Room from './Room'
import io from 'socket.io-client'

class Rooms extends Component  {
   
  constructor(props) {
    super(props)
    this.state = {
      rooms: [],
    }
    const token = window.localStorage.getItem('token')
    const socket = io('http://localhost:3001?token='+token)

    socket.on('addRoom', room => {
      this.setState({rooms: [...this.state.rooms, room]})
    })

    socket.on('listRooms', rooms => {
      this.setState({rooms: rooms})
      
    })

    socket.on('newMsg', mensagem => {
      if(mensagem.room !== this.roomId) {
         let rooms = [...this.state.rooms]
         let m = rooms.find( room => room._id === mensagem.room)
         if(!m.count) {
           m.count = 1
         } else {
           m.count++
         }
         this.setState({rooms: rooms})

      }
   })
 
    socket.on('newAudio', mensagem => {
      if(mensagem.room !== this.roomId) {
        let rooms = [...this.state.rooms]
        let m = rooms.find( room => room._id === mensagem.room)
        if(!m.count) {
          m.count = 1
        } else {
          m.count++
        }
        this.setState({rooms: rooms})

     }
   })
    
    this.socket = socket
    this.zerarQtd = this.zerarQtd.bind(this)
  }

  zerarQtd() {
      let rooms = [...this.state.rooms]
      let m = rooms.find( room => room._id === this.roomId)
      if(m && m.count) {
        delete m.count
      }
      this.setState({rooms: rooms})
 
    
  }
  
  render() {
 
 
    return (
      
      <div className="container w-container">
      <div className="rooms">
        <h1 className="title-rooms">Salas Disponíveis</h1>
        <ul className="room-list w-list-unstyled">
        {
          this.state.rooms.map( room => {
           return  <Link key={room._id}  style={{textDecoration: 'none'}} to={`/rooms/${room._id}`}>
              <li style={{cursor: 'pointer'}} className='room-item' >
              {room.name} {room.count && ' >> ' + room.count}
              </li>
              </Link>
          })
        }
      
        </ul>

          <div style={{cursor: 'pointer'}} className="add-room">+</div>
      </div>
      
      <Route path='/rooms' exact component={SelectRoom}/>
      <Route path='/rooms/:room' render={ props => <Room setRoom={ roomId => {
        this.roomId = roomId
        this.zerarQtd()
      }} {...props} socket={this.socket} />} />
    
    </div>
    )
   }
  }


export default Rooms 