import React from "react";
import axios from '../../../../components/axios'
import {useNavigate} from 'react-router-dom'

import "easymde/dist/easymde.min.css";
import styles from './add.module.css'
import BlogForm from "../blog-form/blog-form";


const AddPost: React.FC = () => {
  const navigate = useNavigate()
  const inputFileRef = React.useRef<HTMLInputElement | null>(null)
  const [text, setText] = React.useState<string>("");
  const [imgUrl, setImgUrl] = React.useState<string>("")
  const [title, setTitle] = React.useState<string>("");
  const [tags, setTags] = React.useState<string>("");

  const onChange = React.useCallback((text: string) => {
      setText(text);
    }, []);

  const removeImgUrl = () => {
    setImgUrl('')
  }

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