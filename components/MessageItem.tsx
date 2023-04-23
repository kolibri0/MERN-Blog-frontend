import * as React from 'react';



const MessageItem = ({ styles, user, message, key }) => {
  return (
    <div className={message.user == user._id ? styles.me : styles.friend} key={key}>
      <div className={message.user == user._id ? styles.message : styles.messageFriend}>
        {message.text}
      </div>
    </div>
  )
}


export default MessageItem