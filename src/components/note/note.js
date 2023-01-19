import {RiEdit2Line, RiDeleteBin6Line} from 'react-icons/ri'
import {Link} from 'react-router-dom'
import {CiCirclePlus} from 'react-icons/ci'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteNote, getAllNote } from "../../redux/noteSlice"
import { useNavigate } from "react-router-dom"

import styles from './note.module.css'

const Note = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {note} = useSelector(state => state.noteSlice)

    useEffect(() => {
        dispatch(getAllNote())
    }, [])

    const addNote = () => {
        navigate('/add-note')
    }

    const editNote = (id) => {
        navigate(`${id}/edit`)
    }

    const removeNote = (id) => {
        dispatch(deleteNote(id))
    }

    return(
    <div>
        <CiCirclePlus className={styles.plus} onClick={() => addNote()}/>
    
        <div className={styles.grid}>
            {note ? note.map((item) => (
                <div className={styles.item} key={item._id}>
                    <Link className={styles.link} to={`/note/${item._id}`}>{item.title.slice(0, 25)+ '...'}</Link> 
                    <RiEdit2Line className={styles.edit} onClick={() => editNote(item._id)}/>
                    <hr/>
                    <Link className={styles.link} to={`/note/${item._id}`}>{item.text.slice(0, 88) + '...'}</Link>
                    <RiDeleteBin6Line className={styles.delete} onClick={() => removeNote(item._id)}/>
                </div>
                )): null}
        
        </div>

    </div>
    )
}

export default Note