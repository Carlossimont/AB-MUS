import './Chat.scss'

function Chat() {
    return (
    <div className="moverchat">
        <button>Leave Room</button>
        <div className="message-container">
            <div className="user-message">
            <div className="message bg-primary">message</div>
            <div className="from-user">user</div>   
            </div>
        </div>
        <input type="text" />
        <button>Send</button> 

    </div>
    )
}
export default Chat;