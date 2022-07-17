const Message = ({message}) => {
    if (message !== null){
        if (message.includes("removed")){
            return (
                <div className="error">
                    {message}
                </div>
        )
        }
        else {
            return (
            <div className="addition">
                {message}
            </div>
        )
        }
    }   
}

export default Message