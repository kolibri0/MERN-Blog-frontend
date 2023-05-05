import * as React from 'react';
import { CgProfile } from "react-icons/cg"


const ChatItem = ({ styles, chat, user, selectChat }) => {
  console.log(chat)
  return (
    <div className={styles.chatItem} onClick={() => selectChat(chat)} key={chat._id}>
      {/* <div className={styles.profileImg}></div> */}
      <CgProfile className={styles.profileImg} color={chat.userOne._id == user._id ? chat.userTwo.color : chat.userOne.color} />
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