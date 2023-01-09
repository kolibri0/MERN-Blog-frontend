import axios from '../../../axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {useDispatch,} from 'react-redux'
import { changeNote, createNote} from '../../../redux/noteSlice'

import styles from '../note.module.css'

const NoteAdd = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const isEdit = Boolean(id) 

    useEffect(() => {
        if(id){
            axios.get(`http://localhost:5000/note/${id}`).then(res => {
                setText(res.data.note.text)
                setTitle(res.data.note.title)
            })
        }
    }, [])

    const add = () => {
        dispatch(createNote({text, title})).then(() => navigate('/note'))
    }

    const change = () => {
        dispatch(changeNote({id, text, title})).then(() => navigate('/note'))
    }

    const cancel = () => {
        navigate('/note')
    }

    return(
    <div className={styles.addForm}>
        <input value={title} minLength={1} onChange={(e) => setTitle(e.target.value)} className={styles.title} placeholder='Enter title...'/>
        <div className={styles.hr} />
        <textarea className={styles.textarea} minLength={1} onChange={(e) => setText(e.target.value)} placeholder='Enter text......' value={text}/>
        <div className={styles.right}>
            {isEdit 
            ?<button className={styles.btn} onClick={() => change()}>Edit</button>
            :<button className={styles.btn} onClick={() => add()}>Create</button>}
            <button className={styles.cancel} onClick={() => cancel()}>Cancel</button>
        </div>
    </div>
    )
}

export default NoteAdd