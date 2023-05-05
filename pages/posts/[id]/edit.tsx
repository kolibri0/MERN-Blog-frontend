import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/router'
import axios from '../../../components/axios'
import styles from '../../../styles/add.module.css'
import '../../../types'
import * as React from 'react';
import BlogForm from "../../../components/BlogForm";
import { IPost } from '../../../Interface/IPost'
import { GetServerSideProps } from "next/types";
import { userAuthSelector } from "../../../redux/auth";
import { useAppSelector } from "../../../redux/hook";
import Layout from "../../../components/Layout";

interface IProps {
  post: IPost
}

const EditPost: React.FC<IProps> = ({ post }) => {
  const router = useRouter()
  const { id } = router.query
  const auth = useAppSelector(userAuthSelector)
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [text, setText] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('')
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string>('');

  useEffect(() => {
    if (!auth && !localStorage.getItem('token')) router.push('/login')
    onChange(post.text)
    setTitle(post.title)
    setImgUrl(post.imgUrl as string)
    if (post.tags) setTags(post.tags.join())
  }, [])

  const changedInput = async (event: any) => {
    try {
      const formData: FormData = new FormData()
      const file = event.target.files[0]
      formData.append('image', file)
      const { data } = await axios.post('uploads', formData)
      setImgUrl(data.url)
    } catch (err) {
      console.warn(err)
      alert('File upload error')
    }
  }
  const onChange = useCallback((text: string) => {
    setText(text);
  }, []);

  const removeImgUrl = () => setImgUrl('')

  const onSubmit = async () => {
    const checkSpaces = (str: string) => str.trim() !== ''
    const info = {
      title,
      text,
      tags: tags.length > 0 && checkSpaces(tags) ? tags.trim().split(",") : [],
      imgUrl
    }
    const { data } = await axios.patch(`/posts/${id}`, info)
    const _id: string = data.doc._id
    router.push(`/posts/${_id}`)
  }

  return (
    <Layout title="Post edit">
      <div className={styles.post}>
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
      </div>
    </Layout>
  );
}
export default EditPost;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const post = await axios.get(`/posts/${query.id}`)
  return {
    props: {
      post: post.data.post
    }
  }
}