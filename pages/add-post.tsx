import * as React from 'react'
import styles from '../styles/add.module.css'
import '../types'
import BlogForm from '../components/BlogForm'
import axios from '../components/axios'
import { useRouter } from 'next/router'

const AddPost = () => {
  const router = useRouter()
  const inputFileRef = React.useRef(null)
  const [text, setText] = React.useState<string>("");
  const [imgUrl, setImgUrl] = React.useState<string>("")
  const [title, setTitle] = React.useState<string>("");
  const [tags, setTags] = React.useState<string>("");

  const onChange = React.useCallback((text: string) => { 
    setText(text) 
  }, []);

  const removeImgUrl = (): void => setImgUrl('')

  const changedInput = async (event: any) => {
    try {
        const formData = new FormData()
        const file = event.target.files[0] 
        formData.append('image', file)
        const {data} = await axios.post('uploads', formData)
        setImgUrl(data.url)
    } catch (err) {
        console.warn(err)
        alert('File upload error')
    }
  } 
    
  const onSubmit = async () => {
    const checkSpaces = (str: string) => str.trim() !== ''
    const info = {
      title,
      text,
      tags: tags.length > 0 && checkSpaces(tags) ? tags.trim().split(",") : [],
      imgUrl
    }
    const {data} = await axios.post('posts', info)
    const id: string = data.post._id
    router.push(`/posts/${id}`)
  }

    return(<div className={styles.post}>
      <BlogForm 
      onSubmit={onSubmit}
      text={text}
      title={title}
      setTitle={setTitle}
      imgUrl={imgUrl}
      removeImgUrl={removeImgUrl}
      inputFileRef={inputFileRef}
      onChange={onChange}
      changedInput={changedInput}
      tags={tags}
      setTags={setTags}
      />
    </div>)
}
export default AddPost;