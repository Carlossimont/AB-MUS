import { useState,useEffect,useRef } from 'react';
import './Chat.scss'

const Chat = ({users,user,messages,message,setMessage,closeConnection,sendMessage})=> {

 function functionSend(){
    sendMessage(message);
    setMessage('');
 }

    const messagesEndRef = useRef(null)
  
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({behavior: "smooth"})
    }
  
    useEffect(scrollToBottom, [messages]);

    return (
    <div className="moverchat">
        <div className='fondo_chat_superior'><button className='send_button' onClick={()=>{closeConnection(); window.location.href = '../createroom'}}>Leave Room</button></div>
        
        
        <div className="message-container">
            {messages.map((m,index)=>
            <div className={m.user === user ? "user-me": "user-you" }>
                <div key={index} className={m.user === user ? "user-message": "user-message2" }>
                    <div className="bg-primary">{m.message}</div>
                    <div className="from-user"><span>{m.user}</span></div>

                </div> 
             </div>
            )}
            <div ref={messagesEndRef}/>
           
        </div>
        <div className='display_flex_chat'>
            <input className="input_msg" type="text" name="" id="" onChange={(m)=>setMessage(m.target.value)} value={message} />
            <button className="send_button" onClick={()=>functionSend()}>Send</button> 
        </div>
    </div>

    
    )
}
export default Chat;