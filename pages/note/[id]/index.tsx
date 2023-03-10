import {useRouter} from 'next/router'
import {useAppDispatch, useAppSelector} from '../../../redux/hook'
import axios from '../../../components/axios'
import styles from '../../../styles/note.module.css'
import '../../../types'
import {deleteNote} from '../../../redux/note'
import {RiEdit2Line, RiDeleteBin6Line} from 'react-icons/ri'
import * as React from 'react';
import { GetServerSideProps } from 'next/types'
import { INote } from '../../../Interface/INote'
import { userAuthSelector } from '../../../redux/auth'

interface IProps{
  note: INote
}

const NoteItem: React.FC<IProps> = ({note}) => {
    const router = useRouter()
    const {id} = router.query
    const dispatch = useAppDispatch()
    const auth = useAppSelector(userAuthSelector)

    React.useEffect(() => {
      if(!auth && !localStorage.getItem('token'))router.push('/login')
    }, [])

    const cancel = (): Promise<boolean> => router.push(`/note`)

    const remove = (id: string): void => {
      dispatch(deleteNote(id))
      router.push(`/note`)
    }

    const editNote = (): Promise<boolean> => router.push(`${id}/edit`)

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

export const getServerSideProps:GetServerSideProps = async ({query}) => {
    const note = await axios.get(`/note/${query.id}`)
    return {
      props: {
        note: note.data.note,
      }
    }
}