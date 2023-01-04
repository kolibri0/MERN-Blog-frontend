import styles from '../todos.module.css'
import { BsCheck2} from 'react-icons/bs'
import { AiOutlineDelete, AiOutlineExclamation} from 'react-icons/ai'
import { useState } from 'react'

const TodoItem = ({text}) => {
    const [important, setImportant] = useState(false)
    const [done, setDone] = useState(false)
    return(<>
        <div className={styles.item}>
            <div className={done? styles.left : null}>
                <div className={important? styles.important : styles.text} >
                    {text}
                </div>
            </div>
            <div className={styles.right}>
            <div className={styles.icon} onClick={() => setDone(!done)}><BsCheck2 /></div>
            <div className={styles.icon} onClick={() => setImportant(!important)}><AiOutlineExclamation /></div>
            <div className={styles.icon}><AiOutlineDelete /></div>
            </div>
        </div>
    </>)
}
export default TodoItem