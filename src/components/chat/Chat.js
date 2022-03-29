import { useState,useEffect,useRef } from 'react';
import './Chat.scss'

const Chat = ({users,messages,message,setMessage,closeConnection,sendMessage})=> {

 function functionSend(){
    sendMessage(message);
    setMessage('');
 }

    const messagesEndRef = useRef(null)
  
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(scrollToBottom, [messages]);

    return (
    <div className="moverchat">
        <button onClick={()=>closeConnection()}>Leave Room</button>
        
        <div className="message-container">
            {messages.map((m,index)=>
             <div key={index} className="user-message">
                <div className="message bg-primary">{m.message}</div>
                <div className="from-user">{m.user}</div>   
             </div>
            )}
            <div ref={messagesEndRef}/>
           
        </div>
        <div>
            <input type="text" name="" id="" onChange={(m)=>setMessage(m.target.value)} value={message} />
            <button onClick={()=>functionSend()}>Send</button> 
        </div>
    </div>

    
    )
}
export default Chat;