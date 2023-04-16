import * as React from 'react';
import styles from '../../styles/chat.module.css'
import '../../types'
import { AiOutlineSend } from 'react-icons/ai'
import { MdOutlineAttachFile } from 'react-icons/md'
import axios from '../../components/axios'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { SocketContext } from '../../components/context/socket'
import { useRouter } from 'next/router';


const Chat = () => {
  const socket = React.useContext(SocketContext)
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const { user } = useAppSelector(state => state.userSlice)
  const [chats, setChats] = React.useState<any[]>([])
  const [chatMessages, setChatMessages] = React.useState<any[]>([])
  const [chatName, setChatName] = React.useState('Select chat')
  const [chatID, setChatID] = React.useState('')
  const [messageText, setMessageText] = React.useState('')

  const getUSerChats = async () => {
    const { data } = await axios.get(`/users/${user?._id}/chats`)
    setChats(data.chats)
  }

  const selectChat = (chat) => {
    socket.emit('leave', { roomId: chat._id })
    setChatID('')
    setMessageText('')
    getChatMessage(chat._id)
    setChatID(chat._id)
    if (user)
      chat.userOne._id == user._id
        ? setChatName(chat.userTwo.name)
        : setChatName(chat.userOne.name)
  }

  const getChatMessage = React.useCallback((id: any) => {
    socket.emit('get-room-messages', { roomId: id })
    socket.on("output-room-message", (data) => {
      setChatMessages(data)
    })
    socket.emit('join', { roomId: id })
  }, [])

  React.useEffect(() => {
    getUSerChats()
  }, [])

  const inputRef = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click()
    }
  }

  const sendMessage = () => {
    socket.emit("send-message", { roomId: chatID, text: messageText, userId: user?._id })
    socket.on('get-message', data => {
      // setChatMessages([...chatMessages, data.message])
      setChatMessages(data.message)

    })
    setMessageText('')
  }


  return (<>
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.messages}>Messages</div>
        {
          chats
            ? chats.map((chat) => (
              <div className={styles.chatItem} onClick={() => selectChat(chat)} key={chat._id}>
                <div className={styles.profileImg}></div>
                {user &&
                  chat.userOne._id == user._id
                  ? <div className={styles.chatPerson}>{chat.userTwo.name}</div>
                  : <div className={styles.chatPerson}>{chat.userOne.name}</div>
                }
              </div>
            ))
            : null
        }
      </div>
      <div className={styles.right}>
        <div className={styles.chatHead}>
          <div className={styles.headName}>{chatName}</div>
          <div className={styles.hr} />
        </div>
        <div className={styles.chat}>
          {user &&
            chatMessages
            ? chatMessages.map((message) => (
              <div className={message.user == user._id ? styles.me : styles.friend} key={message._id}>
                <div className={message.user == user._id ? styles.message : styles.messageFriend}>
                  {message.text}
                </div>
              </div>
            ))
            : null
          }
        </div>

        <div className={styles.messageBlock}>
          <div className={styles.inputBlock}>
            <input className={styles.messageInput} type="text" value={messageText} placeholder='Enter message...' onChange={(e) => setMessageText(e.target.value)} />
            <input type="file" ref={inputFileRef} hidden />
            <div className={styles.file}>{<MdOutlineAttachFile onClick={() => inputRef()} />}</div>
          </div>
          <button className={styles.sendMessage}><AiOutlineSend className={styles.send} onClick={() => sendMessage()} /></button>
        </div>
      </div>
    </div>
  </>)

}

export default Chat;