import React from "react";
import axios from '../../../axios'
import {useNavigate} from 'react-router-dom'

import "easymde/dist/easymde.min.css";
import styles from './add.module.css'
import BlogForm from "../blog-form/blog-form";


const AddPost = () => {
  const navigate = useNavigate()
  const inputFileRef = React.useRef(null)
  const [text, setText] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("")
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");

  const onChange = React.useCallback((text) => {
      setText(text);
    }, []);

  const removeImgUrl = () => {
    setImgUrl('')
  }

  const changedInput = async (event) => {
      try {
          const formData = new FormData()
          const file = event.target.files[0] 
          formData.append('image', file)
          const {data} = await axios.post('http://localhost:5000/uploads', formData)
          setImgUrl(data.url)
      } catch (err) {
          console.warn(err)
          alert('File upload error')
      }
  }

  const onSubmit = async () => {
    const info = {
      title,
      text,
      tags: tags.split(","),
      imgUrl
    }
    const {data} = await axios.post('http://localhost:5000/posts', info)
    const id = data.post._id
    navigate(`/posts/${id}`)
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

export default AddPost