import { useRouter } from "next/router"
import * as React from 'react';
import { useAppDispatch } from "../redux/hook"
import { createNote } from "../redux/note"
import styles from '../styles/note.module.css'
import '../types'

const AddNote = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [title, setTitle] = React.useState<string>('')
    const [text, setText] = React.useState<string>('')

    const add = (): Promise<boolean> => dispatch(createNote({text, title})).then(() => router.push(`/note`))
    const cancel = (): Promise<boolean> => router.push(`/note`)

    return(
      <div className={styles.addForm}>
        <input value={title} minLength={1} onChange={(e) => setTitle(e.target.value)} className={styles.title} placeholder='Enter title...'/>
        <div className={styles.hr} />
          <textarea className={styles.textarea} minLength={1} onChange={(e) => setText(e.target.value)} placeholder='Enter text......' value={text}/>
          <div className={styles.right}>
          <button className={styles.btn} onClick={() => add()}>Create</button>
          <button className={styles.cancel} onClick={() => cancel()}>Cancel</button>
        </div>
      </div>
    )
}
export default AddNote;