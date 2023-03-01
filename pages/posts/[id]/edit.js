import { useRef, useState, useEffect, useCallback } from "react";
import {useRouter} from 'next/router'
import axios from '../../../components/axios'
import styles from '../../../styles/add.module.css'
import BlogForm from "../../../components/BlogForm";

const EditPost = ({post}) => {
  const router = useRouter()
  const {id} = router.query
  console.log(id)
  const inputFileRef = useRef(null)
  const [text, setText] = useState('');
  const [imgUrl, setImgUrl] = useState('')
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {

    onChange(post.text)
    setTitle(post.title)
    setImgUrl(post.imgUrl)
    setTags(post.tags.join())

  },[])   
  
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
  const onChange = useCallback((text) => {
    setText(text);
  }, []);

  const removeImgUrl = () => setImgUrl('')

  const onSubmit = async () => {
    const checkSpaces = (str) => str.trim() !== ''
    const info = {
      title,
      text,
      tags: tags.length > 0 && checkSpaces(tags) ? tags.trim().split(",") : [],
      imgUrl
    }
    const {data} = await axios.patch(`/posts/${id}`, info)
    const _id = data.doc._id
    router.push(`/posts/${_id}`)
  }


    return (<div className={styles.post}>
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
    </div>);
}
 
export default EditPost;


export async function getServerSideProps({query}) {
    const post = await axios.get(`/posts/${query.id}`)

    return {
      props: {
        post: post.data.post
      }
    }
  }