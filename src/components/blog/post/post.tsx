import axios from "../../../axios"
import React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getPostsByTags} from '../../../redux/postSlice'

import { CgProfile } from 'react-icons/cg'
import { AiOutlineEye } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import {RiEdit2Line, RiDeleteBin6Line} from 'react-icons/ri'

import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './post.module.css'
import { useAppDispatch, useAppSelector } from "../../../redux/hook"
import { IComment, IPost } from "../../../Interface/IPost"


const Post: React.FC = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const navigate = useNavigate()
    const textInput = React.useRef<HTMLInputElement>(null)
    const {user} = useAppSelector(state => state.userSlice)
    const [post, setPost] = React.useState<IPost | null>(null)
    const [comments, setComments] = React.useState<[] | IComment[]>([])
    const [commentText, setCommentText] = React.useState<string>('')
    const [change, setChange] = React.useState<boolean>(false)

    const [idChange, setIdChange] = React.useState<string | null>(null)

    const [errorPost, setErrorPost] = React.useState<boolean>(false)
    

    React.useEffect(() => {
        
            const fetchPost = async () => {
                try {
                    const post = await axios.get(`posts/${id}`)
                    setPost(post.data.post)
                } catch (err) {
                    setErrorPost(true)
                }
            }
            fetchPost()
            getAllComments()
    }, [])

    const deletePost = async () => {
        try {
            const {data} = await axios.delete(`posts/${id}`)
            if(data.success){
                navigate('/')
            }
        } catch (err) {
            alert("Somthing wrond, can't delete this post")
        }   
    }

    const getAllComments = async () => {
        try {
          const comments = await axios.get(`comments/${id}`)
            setComments(comments.data.list.reverse())  
        } catch (err) {
            alert("We can't get comments for this post :(")
        }
        
    }

    const createComment = async () => {
        try {
            const {data} = await axios.post(`comments/${id}`, {text: commentText})
            if(data.success){
                getAllComments()
                setCommentText('')
            }
        } catch (err) {
            alert("We can't create comment for this post :(")
        }
        
    }

    const removeComment = async (commentId: string) =>{
        try {
            const {data} = await axios.delete(`posts/${id}/comments/${commentId}`)
                if(data.success){
                getAllComments()
            }
        } catch (err) {
            alert("We can't remove comment for this post :(")
        }
        
    }

    const changeComment = async () =>{
        try {
            const {data} = await axios.patch(`comments/${idChange}`, {text: commentText})
            if(data.success){
               getAllComments()
               setChange(false)
               setIdChange(null)
               setCommentText('')
            }
        } catch (err) {
            alert("We can't change comment for this post :(")
        }
        
    }

    const getByTag = (tag: string) => {
       navigate(`/posts/tag/${tag}`)

        dispatch(getPostsByTags(tag))
    }

    const ChangePost = async () => {
       navigate(`/posts/${id}/edit`)
    }

    const cancel = () => {
        setChange(false)
        setIdChange(null)
        setCommentText('')
    }



    if (errorPost) {
        return (<Alert variant="danger" style={{width: '500px', margin: '10px auto'}}>
            <Alert.Heading>Oh snap! Somthing wrong!</Alert.Heading>
            <p>
            Reload the page or go to <Link to={'/'} className={styles.home}>homepage.</Link> 
            
            </p>
          </Alert>
        )
    }


    return(<>{post
    ?<><div className={styles.post}>
            {post.imgUrl
            ?<img className={styles.img}  src={process.env.REACT_APP_URL_REQUEST_IMG + post.imgUrl} alt={'Post'}/> 
            :null
            }
            <div className={styles.info}>
                <div><CgProfile className={styles.person} style={{color: `${post.user.color}`}}/></div>
                <div>
                    <Link className={styles.name} to={`/user/${post.user._id}`}>{post?.user.name}</Link>
                    <div className={styles.title}>{post.title}</div>
                    {post?.tags !== undefined && post.tags.length
                    ? post.tags.map((tag) => <p className={styles.tagItem} onClick={() => getByTag(tag)}>#{tag}</p>)
                    : null}
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{post.text}</ReactMarkdown>
                    <div className={styles.icons}>
                        <div className={styles.iconItem}><AiOutlineEye /> {post.views}</div> 
                        <div className={styles.iconItem}><BiComment /> {post.comments.length}</div>
                    </div>
                    <button className={styles.back} onClick={() => navigate('/posts')}>Back</button>
                    {user && user._id === post.user._id
                    ?<>
                        <RiDeleteBin6Line  className={styles.deletePost} onClick={() => deletePost()}/>
                        <RiEdit2Line className={styles.changePost} onClick={() => ChangePost()}/>
                    </>
                    :null}
                </div>
            </div>
    </div>
    <div className={styles.comments}>
        <div className={styles.block}>Comments</div>
        <div className={styles.commentAdd}>
            <CgProfile className={styles.person}/>
            <input className={styles.Input} ref={textInput} value={commentText} type={'text'} placeholder='Enter comment...' onChange={(e) => setCommentText(e.target.value)} />
        </div> 

        {commentText.length && !change
        ? <button className={styles.btn} onClick={() => createComment()}>Submit</button>
        : null}

        {commentText.length && change
        ? <div className={styles.changeBtns}>
            <button className={styles.cancel} onClick={() => cancel()}>Cancel</button>
            <button className={styles.btn} onClick={() => changeComment()}>Change</button>
          </div>
        : null}

        {post && comments.length 
        ? comments.map((comment) => (
            <div className={styles.commentItem} key={comment._id}>
                <div className={styles.commentPerson}>
                    <Link to={`/user/${comment?.user._id}`}><CgProfile className={styles.personComment} style={{color: `${comment.user.color}`}}/></Link>  
                    <Link className={styles.commentName} to={`/user/${comment?.user._id}`}>{comment?.user.name}</Link> 
                </div>
                <div className={styles.commentText}>{comment.text}</div> 

            {user && user._id === comment.user._id 
            ?<div>
                <RiDeleteBin6Line className={styles.delete} onClick={() => removeComment(comment._id)}/> 
                <RiEdit2Line className={styles.edit} onClick={() => {
                    setChange(true)
                    setIdChange(comment._id)
                    setCommentText(comment.text)
                    if(textInput.current){
                        textInput?.current.focus()
                        textInput?.current.scrollIntoView()
                    }
                    }}/> 
            </div>
            : null
            }

        </div>
        ))
        :null 
        }
    </div>
    </>
    :null
    }
    </>)
}

export default Post

