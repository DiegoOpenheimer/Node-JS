import React, {Component} from 'react'

export default class Room extends Component {
    
  constructor(props) {
    super(props)
   
   this.state = {msgs: []}
   this.roomId = this.props.match.params.room
   this.socket = this.props.socket
   this.audioPermission = false
   this.mediaRecorder = null

    navigator
    .mediaDevices
    .getUserMedia({audio: true})
    .then( mediaStream => {
      this.audioPermission = true
      this.mediaRecorder = new MediaRecorder(mediaStream)
      let chunks = []
      this.mediaRecorder.ondataavailable =  data => {
          chunks.push(data.data)
      }
     
      this.mediaRecorder.onstop = () => {
        const reader = new window.FileReader() 
        const blob = new Blob(chunks, {type: 'audio/ogg; codec=opus'})
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
          this.socket.emit('sendAudio', {
            data: reader.result,
            roomId: this.roomId
          })
        }
        chunks = []
      }

    }, err => {
      this.audioPermission = false
      this.mediaRecorder = null
    })

   this.socket.emit('join', this.roomId)
   this.props.setRoom(this.roomId)
   
   this.socket.on('listMsg', msgs => {
     this.setState({msgs: msgs})
   })

   this.socket.on('newMsg', mensagem => {
     let msg = [...this.state.msgs, mensagem]
     this.setState({msgs: msg})
  })

  this.socket.on('newAudio', audio => {
      const msg = [...this.state.msgs, audio]
      this.setState({msgs: msg})
  })

   this.handleKeyUp = this.handleKeyUp.bind(this)
  this.mouseDown = this.mouseDown.bind(this)
  this.mouseUp = this.mouseUp.bind(this)
  }
  
  componentWillReceiveProps(newProps) {
    if(newProps.match.params.room && newProps.match.params.room !== this.roomId ) {
      this.roomId = newProps.match.params.room
      this.props.setRoom(this.roomId)
      this.props.socket.emit('join', this.roomId)
    }
  }

  mouseDown() {
    if(this.audioPermission) {
      this.mediaRecorder.start()
    }
  }

  mouseUp() {
    if(this.audioPermission) {
      this.mediaRecorder.stop()
    }
  }

  handleKeyUp(e) {
    if(e.keyCode === 13) {
      this.socket.emit('newMsg', {
        message: this.msg.value,
        roomId:  this.roomId
      })
      this.msg.value = ''
    }
  }

  renderMsg(msg) {
    if(msg.typeMsg === 'text') {
      return  (  
        <div key={msg._id} className="message">
          <span className="author">{msg.author}</span><br />    
          <span className="msg-body">{msg.message}</span>
        </div>
      )
    } else {
      return(
        <div key={msg._id} className="message">
          <span className="author">{msg.author}</span><br />    
          <audio controls className="msg-body" src={msg.message} />
        </div>
     )
    }
  }
  
  render() {
    let msgs = this.state.msgs.map( msg => this.renderMsg(msg))
    return(
    
         <div className="room">
            <div style={{overflow: 'auto'}} className="messages">
            {msgs}
            </div>
            <div className="new-message-form w-form">
              <form id="email-form" name="email-form" data-name="Email Form" className="form">
              <textarea onKeyUp={this.handleKeyUp} ref={ref => this.msg = ref} id="field" name="field" maxLength="5000" placeholder="Digite sua mensagem e pressione &lt;Enter&gt;" autoFocus="true" className="msg w-input"></textarea>
              <button onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} type="button" className="send-audio w-button">Enviar<br />>Áudio</button>
              </form>
            </div>
          </div>
        )
    }
}