import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { useEffect, useState } from 'react'
import styles from '../../../styles/note.module.css'
import '../../../types'
import axios from '../../../components/axios'
import { useRouter } from 'next/router'
import { changeNote } from '../../../redux/note'
import * as React from 'react';
import { GetServerSideProps } from 'next/types'
import { INote } from '../../../Interface/INote'
import { userAuthSelector } from '../../../redux/auth'
import Layout from '../../../components/Layout'

interface IProps {
  note: INote
}

const EditNote: React.FC<IProps> = ({ note }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id } = router.query
  const [title, setTitle] = useState<string>('')
  const [text, setText] = useState<string>('')
  const auth = useAppSelector(userAuthSelector)

  const cancel = (): Promise<boolean> => router.push(`/note`)

  const change = (): Promise<boolean> => dispatch(changeNote({ id, text, title })).then(() => router.push('/note'))

  useEffect(() => {
    if (!auth && !localStorage.getItem('token')) router.push('/login')
    setTitle(note.title)
    setText(note.text)
  }, [])

  return (
    <Layout title='Note edit'>
      <div className={styles.addForm}>
        <input value={title} minLength={1} onChange={(e) => setTitle(e.target.value)} className={styles.title} placeholder='Enter title...' />
        <div className={styles.hr} />
        <textarea className={styles.textarea} minLength={1} onChange={(e) => setText(e.target.value)} placeholder='Enter text......' value={text} />
        <div className={styles.right}>
          <button className={styles.btn} onClick={() => change()}>Edit</button>
          <button className={styles.cancel} onClick={() => cancel()}>Cancel</button>
        </div>
      </div>
    </Layout>
  )
}
export default EditNote;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const note = await axios.get(`/note/${query.id}`)
  return {
    props: {
      note: note.data.note,
    }
  }
}