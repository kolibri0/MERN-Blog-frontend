import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams} from 'react-router-dom'
import { deleteNote, getNote, show } from '../../../redux/noteSlice'
import {RiEdit2Line, RiDeleteBin6Line} from 'react-icons/ri'

import styles from '../note.module.css'


const NoteItem = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const dispatch = useDispatch()
    const {noteItem } = useSelector(state => state.noteSlice)

    const cancel = () => {
        navigate('/note')
    }

    const remove = (id) => {
        dispatch(deleteNote(id))
        navigate('/note')
        dispatch(show(true))
        setTimeout(() => {
        dispatch(show(false))
        }, 3000);
    }

    const editNote = () => {
        navigate(`edit`)
    }

    useEffect(() => {
        dispatch(getNote(id))
    })

    return(
        <div className={styles.addForm}>
        <div className={styles.title}>{noteItem.title?.length > 70
        ? noteItem.title.slice(0,70) + '...'
        : noteItem.title}
        </div> 
        <RiEdit2Line className={styles.edit} onClick={() => editNote()}/>
        <div className={styles.hr}/>
        <div className={styles.textarea}>{noteItem.text}</div>
        <RiDeleteBin6Line className={styles.delete} onClick={() => remove(noteItem._id)}/>
        <button className={styles.cancel} onClick={() => cancel()}>Cancel</button>
    </div>
    )
}

export default NoteItem