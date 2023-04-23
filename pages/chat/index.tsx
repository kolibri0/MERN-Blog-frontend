import * as React from 'react';
import styles from '../../styles/chat.module.css'
import '../../types'
import { AiOutlineSend } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { MdOutlineAttachFile } from 'react-icons/md'
import axios from '../../components/axios'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { SocketContext } from '../../components/context/socket'
import { useRouter } from 'next/router';
import ChatItem from '../../components/ChatItem';
import MessageItem from '../../components/MessageItem';
import { IMessage } from '../../Interface/IMessage'
import { IChat } from '../../Interface/IChat'

const Chat = () => {
  const router = useRouter()
  const socket = React.useContext(SocketContext)
  const { user } = useAppSelector(state => state.userSlice)
  const [chats, setChats] = React.useState<any[]>([])
  const [chatMessages, setChatMessages] = React.useState<any[]>([])
  const [chatName, setChatName] = React.useState('Select chat')
  const [chatID, setChatID] = React.useState('')
  const [messageText, setMessageText] = React.useState('')

  const getUSerChats = async (): Promise<void> => {
    const { data } = await axios.get(`/users/${user?._id}/chats`)
    setChats(data.chats)
  }
  const selectChat = (chat): void => {
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

  const getChatMessage = React.useCallback((id: any): void => {
    socket.emit('get-room-messages', { roomId: id })
    socket.on("output-room-message", (data) => {
      setChatMessages(data)
    })
    socket.emit('join', { roomId: id })
  }, [])

  React.useEffect(() => {
    if (!user) router.push('/login')
    getUSerChats()
  }, [])

  const sendMessage = (): void => {
    socket.emit("send-message", { roomId: chatID, text: messageText, userId: user?._id })
    socket.on('get-message', data => {
      setChatMessages(data.message)
    })
    setMessageText('')
  }

  const deleteChat = async (): Promise<void> => {
    const { data } = await axios.delete(`/chats/${chatID}`)
    if (data.success) {
      setChats(chats.filter(el => el._id != chatID))
      setChatMessages([])
      setChatName('Select chat')
    }
  }

  return (<>
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.messages}>People</div>
        {
          chats
            ? chats.map((chat: IChat) => <ChatItem styles={styles} chat={chat} user={user} selectChat={selectChat} />)
            : null
        }
      </div>
      <div className={styles.right}>
        <div className={styles.chatHead}>
          <div className={styles.chatHeadContain}>
            <div>
              <div className={styles.headName}>{chatName}</div>
            </div>
            <div>
              {
                chatID.length
                  ? <button className={styles.deleteChat} onClick={() => deleteChat()} ><RiDeleteBin6Line /></button>
                  : null
              }
            </div>
          </div>
          <div className={styles.hr} />
        </div>
        <div className={styles.chat}>
          {user && chatMessages
            ? chatMessages.map((message: IMessage) => <MessageItem styles={styles} user={user} message={message} key={message._id} />)
            : null
          }
        </div>

        <div className={styles.messageBlock}>
          <div className={styles.inputBlock}>
            <input className={styles.messageInput} type="text" value={messageText} placeholder='Enter message...' onChange={(e) => setMessageText(e.target.value)} disabled={!(chatID.length > 0)} />
          </div>
          <button className={styles.sendMessage}><AiOutlineSend className={styles.send} onClick={() => sendMessage()} /></button>
        </div>
      </div>
    </div>
  </>)
}

export default Chat;