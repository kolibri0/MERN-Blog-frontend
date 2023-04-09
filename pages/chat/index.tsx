import * as React from 'react';
import styles from '../../styles/chat.module.css'
import '../../types'
import { AiOutlineSend } from 'react-icons/ai'
import { MdOutlineAttachFile } from 'react-icons/md'
import axios from '../../components/axios'


const Chat = () => {

  const inputFileRef = React.useRef<HTMLInputElement>(null)


  const inputRef = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click()
    }
  }

  const sendMessage = () => {
    console.log("!@")
  }

  return (<>
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.messages}>Messages</div>
        <div className={styles.chatItem}>
          <div className={styles.profileImg}></div>
          <div className={styles.chatPerson}>My Name</div>
        </div>

        <div className={styles.chatItem}>
          <div className={styles.profileImg}></div>
          <div className={styles.chatPerson}>My Name Alex</div>
        </div>

        <div className={styles.chatItem}>
          <div className={styles.profileImg}></div>
          <div className={styles.chatPerson}>My Name Again</div>
        </div>




        <div className={styles.chatItem}>
          <div className={styles.profileImg}></div>
          <div className={styles.chatPerson}>My Name Again</div>
        </div>
        <div className={styles.chatItem}>
          <div className={styles.profileImg}></div>
          <div className={styles.chatPerson}>My Name Again</div>
        </div>
        <div className={styles.chatItem}>
          <div className={styles.profileImg}></div>
          <div className={styles.chatPerson}>My Name Again</div>
        </div>
        <div className={styles.chatItem}>
          <div className={styles.profileImg}></div>
          <div className={styles.chatPerson}>My Name Again</div>
        </div>
        <div className={styles.chatItem}>
          <div className={styles.profileImg}></div>
          <div className={styles.chatPerson}>My Name Again</div>
        </div>
        <div className={styles.chatItem}>
          <div className={styles.profileImg}></div>
          <div className={styles.chatPerson}>My Name Again</div>
        </div>
        <div className={styles.chatItem}>
          <div className={styles.profileImg}></div>
          <div className={styles.chatPerson}>My Name Again</div>
        </div>
        <div className={styles.chatItem}>
          <div className={styles.profileImg}></div>
          <div className={styles.chatPerson}>My Name Again</div>
        </div>
        <div className={styles.chatItem}>
          <div className={styles.profileImg}></div>
          <div className={styles.chatPerson}>My Name Again</div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.chatHead}>
          <div className={styles.headName}>Name some</div>
          <div className={styles.hr} />
        </div>
        <div className={styles.chat}>

          <div className={styles.friend}>
            <p className={styles.messageFriend}>message from some</p>
          </div>

          <div className={styles.me}>
            <p className={styles.message}>
              message from me

              message from me
              message from me

              message from me
              message from me
              message from me
              message from me
              message from me

              message from me
              message from me
              message from me
              message from me
              message from me

              messagfrom me
              message from me
              message rom me
              message fm me
              message from
              message from me
              message from me
              message from me
            </p>
            <p className={styles.message}>a</p>
          </div>
        </div>

        <div className={styles.messageBlock}>
          <div className={styles.inputBlock}>
            <input className={styles.messageInput} type="text" placeholder='Enter message...' />
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