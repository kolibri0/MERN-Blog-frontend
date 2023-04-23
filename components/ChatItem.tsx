import * as React from 'react';



const ChatItem = ({ styles, chat, user, selectChat }) => {
  return (
    <div className={styles.chatItem} onClick={() => selectChat(chat)} key={chat._id}>
      <div className={styles.profileImg}></div>
      {
        user &&
          chat.userOne._id == user._id
          ? <div className={styles.chatPerson}>{chat.userTwo.name}</div>
          : <div className={styles.chatPerson}>{chat.userOne.name}</div>
      }
    </div>
  )
}


export default ChatItem