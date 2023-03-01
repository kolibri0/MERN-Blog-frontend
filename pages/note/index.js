import {RiEdit2Line, RiDeleteBin6Line} from 'react-icons/ri'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {CiCirclePlus} from 'react-icons/ci'
// import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from '../../styles/note.module.css'
import { useEffect } from 'react'
import { getAllNote, deleteNote } from '../../redux/note'



const Note = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const {note} = useSelector(state => state.noteSlice)
    console.log(note)

    useEffect(() => {
        dispatch(getAllNote())
    },[])

    const addNote = () => router.push(`/add-note`)

    const editNote = (id) => router.push(`note/${id}/edit`)

    const removeNote = (id) => dispatch(deleteNote(id))

    return (
     <div className={styles.container}>
        <CiCirclePlus className={styles.plus} onClick={() => addNote()}/>

         <div className={styles.grid}>
            {note ? note.map((item) => (
                <div className={styles.item} key={item._id}>
                    <Link className={styles.link} href={`/note/${item._id}`}>{item.title.slice(0, 25)+ '...'}</Link> 
                    <RiEdit2Line className={styles.edit} onClick={() => editNote(item._id)}/>
                    <div className={styles.hr2}/>
                    <Link className={styles.link} href={`/note/${item._id}`}>{item.text.slice(0, 88) + '...'}</Link>
                    <RiDeleteBin6Line className={styles.delete} onClick={() => removeNote(item._id)}/>
                </div>
            )): null}
     
        </div>
  
    </div>
    );
}
 
export default Note;

