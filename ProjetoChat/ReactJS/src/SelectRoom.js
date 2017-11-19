import React from 'react'

const SelectRoom = props => {
    return(
    <div className="room">
        <div style={{overflow: 'auto'}} className="messages">
            <div className="message">
               <span id="teste" className="msg-body">Selecione uma sala ao lado</span>
            </div>
        </div>
        <div className="new-message-form w-form">
        </div>
    </div>
    )
}


export default SelectRoom