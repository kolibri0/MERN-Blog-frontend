import {useDispatch,} from 'react-redux'
import { useEffect, useState } from 'react'
import styles from '../../../styles/note.module.css'
import axios from '../../../components/axios'
import { useRouter } from 'next/router'
import { changeNote } from '../../../redux/note'

const EditNote = ({note}) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const {id} = router.query
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const cancel = () => {
        navigate('/note')
    }

    const change = () => {
        dispatch(changeNote({id, text, title})).then(() => router.push('/note'))
    }

    useEffect(() => {
        setTitle(note?.title)
        setText(note?.text)
    },[])

    return(
        <div className={styles.addForm}>
            <input value={title} minLength={1} onChange={(e) => setTitle(e.target.value)} className={styles.title} placeholder='Enter title...'/>
            <div className={styles.hr} />
            <textarea className={styles.textarea} minLength={1} onChange={(e) => setText(e.target.value)} placeholder='Enter text......' value={text}/>
            <div className={styles.right}>
                <button className={styles.btn} onClick={() => change()}>Edit</button>
                <button className={styles.cancel} onClick={() => cancel()}>Cancel</button>
            </div>
        </div>
        )
}
 
export default EditNote;


export async function getServerSideProps({query}) {
    const note = await axios.get(`/note/${query.id}`)

    return {
      props: {
        note: note.data.note,
      }
    }
}