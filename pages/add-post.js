import React from 'react'
import styles from '../styles/add.module.css'
import BlogForm from '../components/BlogForm'
import axios from '../components/axios'
import { useRouter } from 'next/router'

const AddPost = () => {
  const router = useRouter()
  const inputFileRef = React.useRef(null)
  const [text, setText] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("")
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");

  const onChange = React.useCallback((text) => { setText(text) }, []);

  const removeImgUrl = () => setImgUrl('')

  const changedInput = async (event) => {
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
    const checkSpaces = (str) => str.trim() !== ''
    const info = {
      title,
      text,
      tags: tags.length > 0 && checkSpaces(tags) ? tags.trim().split(",") : [],
      imgUrl
    }
    const {data} = await axios.post('posts', info)
    const id = data.post._id
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