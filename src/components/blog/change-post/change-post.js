import React from "react";
import axios from '../../../axios'
import { useNavigate, useParams } from "react-router-dom";

import styles from '../add-post/add.module.css'
import BlogForm from "../blog-form/blog-form";

const ChangePost = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const inputFileRef = React.useRef(null)
    const [text, setText] = React.useState("");
    const [imgUrl, setImgUrl] = React.useState("")
    const [title, setTitle] = React.useState("");
    const [tags, setTags] = React.useState("");

    React.useEffect(() => {
        const fetchPost = async () => {
            const post = await axios.get(`http://localhost:5000/posts/${id}`)
            onChange(post.data.post.text)
            setTitle(post.data.post.title)
            setImgUrl(post.data.post.imgUrl)
        }
        fetchPost()
    }, [])
  
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
        imgUrl
      }
      const {data} = await axios.patch(`http://localhost:5000/posts/${id}`, info)
      const _id = data.doc._id
      navigate(`/posts/${_id}`)
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
          />
      </div>)
  
  }
  
  export default ChangePost