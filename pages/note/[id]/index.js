import {useRouter} from 'next/router'
import {useDispatch} from 'react-redux'
import axios from '../../../components/axios'
import styles from '../../../styles/note.module.css'
import {deleteNote} from '../../../redux/note'
import {RiEdit2Line, RiDeleteBin6Line} from 'react-icons/ri'

const NoteItem = ({note}) => {
    const router = useRouter()
    const {id} = router.query
    const dispatch = useDispatch()

    const cancel = () => router.push(`/note`)

    const remove = (id) => {
        dispatch(deleteNote(id))
        router.push(`/note`)
    }

    const editNote = () => router.push(`${id}/edit`)

    return(
        <div className={styles.addForm}>
        {note ?<>
            <div className={styles.title}>
            {
            note.title?.length > 70
                ? note.title.slice(0,70) + '...'
                : note.title
            }
            </div> 
            <RiEdit2Line className={styles.edit} onClick={() => editNote()}/>
            <div className={styles.hr}/>
            <div className={styles.textarea}>{note.text}</div>
            <RiDeleteBin6Line className={styles.delete} onClick={() => remove(note._id)}/>
            <button className={styles.cancel} onClick={() => cancel()}>Cancel</button>
            </>
        :null}
    </div>
    )
}
export default NoteItem;

export async function getServerSideProps({query}) {
    const note = await axios.get(`/note/${query.id}`)
    return {
      props: {
        note: note.data.note,
      }
    }
}