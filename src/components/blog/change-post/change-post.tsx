import React from "react";
import axios from '../../../../components/axios'
import { useNavigate, useParams } from "react-router-dom";

import styles from '../add-post/add.module.css'
import BlogForm from "../blog-form/blog-form";


const ChangePost: React.FC = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const inputFileRef = React.useRef<HTMLInputElement>(null)
    const [text, setText] = React.useState<string>("");
    const [imgUrl, setImgUrl] = React.useState<string>("")
    const [title, setTitle] = React.useState<string>("");
    const [tags, setTags] = React.useState<string>("");

    React.useEffect(() => {
        const fetchPost = async () => {
            const {data} = await axios.get(`posts/${id}`)
            onChange(data.post.text)
            setTitle(data.post.title)
            setImgUrl(data.post.imgUrl)
            setTags(data.post.tags.join())
        }
        fetchPost()
    }, [])
  
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
      const {data} = await axios.patch(`/posts/${id}`, info)
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
          tags={tags}
          setTags={setTags}
          />
      </div>)
  
  }
  
  export default ChangePost