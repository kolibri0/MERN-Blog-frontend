import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CiCirclePlus } from 'react-icons/ci'
import * as React from 'react';
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import styles from '../../styles/note.module.css'
import '../../types'
import { useEffect } from 'react'
import { getAllNote, deleteNote } from '../../redux/note'
import { INote } from '../../Interface/INote';
import { userAuthSelector } from '../../redux/auth';
import Layout from '../../components/Layout';

const Note: React.FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { note } = useAppSelector(state => state.noteSlice)
  const auth = useAppSelector(userAuthSelector)

  useEffect(() => {
    if (auth && localStorage.getItem('token')) {
      dispatch(getAllNote())
    } else {
      router.push('/login')
    }
  }, [])

  const addNote = (): Promise<boolean> => router.push(`/add-note`)
  const editNote = (id: string): Promise<boolean> => router.push(`note/${id}/edit`)
  const removeNote = (id: string) => dispatch(deleteNote(id))

  return (
    <Layout title='Note page'>
      <div className={styles.container}>
        <CiCirclePlus className={styles.plus} onClick={() => addNote()} />
        <div className={styles.grid}>
          {note ? note.map((item: INote) => (
            <div className={styles.item} key={item._id}>
              <Link className={styles.link} href={`/note/${item._id}`}>{item.title.slice(0, 25) + '...'}</Link>
              <RiEdit2Line className={styles.edit} onClick={() => editNote(item._id)} />
              <div className={styles.hr2} />
              <Link className={styles.link} href={`/note/${item._id}`}>{item.text.slice(0, 88) + '...'}</Link>
              <RiDeleteBin6Line className={styles.delete} onClick={() => removeNote(item._id)} />
            </div>
          )) : null}
        </div>
      </div>
    </Layout>
  );
}

export default Note;

