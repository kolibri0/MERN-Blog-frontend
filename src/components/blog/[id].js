// import axios fro../../../components/axiosios'
// import Link from 'next/link'
// import styles from '../../styles/post.module.css'

// import { useEffect, useRef, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useRouter } from 'next/router'

// import { CgProfile } from 'react-icons/cg'
// import { AiOutlineEye } from 'react-icons/ai'
// import { BiComment } from 'react-icons/bi'
// import {RiEdit2Line, RiDeleteBin6Line} from 'react-icons/ri'

// import ReactMarkdown from 'react-markdown'
// import rehypeHighlight from 'rehype-highlight'
// import Alert from 'react-bootstrap/Alert';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Post = ({post, comments}) => {

//     const router = useRouter()
//     const {user} = useSelector(state => state.userSlice)
//     const [postId, setPostId] = useState('')
//     const textInput = useRef(null)
//     const [commentText, setCommentText] = useState('')
//     const [change, setChange] = useState(false)
//     const [idChange, setIdChange] = useState(null)
    
//     useEffect(() => {
//         setPostId(router.query.id)
//     }, [])

//     const deletePost = async () => {
//         try {
//             const {data} = await axios.delete(`/posts/${postId}`)
//             if(data.success){
//                 router.push('/')
//             }
//         } catch (err) {
//             alert("Somthing wrond, can't delete this post")
//         }   
//     }

//     const createComment = async () => {
//         try {
//             const {data} = await axios.post(`/comments/${postId}`, {text: commentText})
//             if(data.success){
//                 setCommentText('')
//                 router.push(`/posts/${postId}`)
//             }
//         } catch (err) {
//             alert("We can't create comment for this post :(")
//         }
//     }

//     const meddlewareChangeComment = (id, text) => {
//         setChange(true)
//         setIdChange(id)
//         setCommentText(text)
//         if(textInput.current){
//             textInput?.current.focus()
//             textInput?.current.scrollIntoView()
//         }
//     }

//     const changeComment = async () =>{
//         try {
//             const {data} = await axios.patch(`/comments/${idChange}`, {text: commentText})
//             if(data.success){
//                setChange(false)
//                setIdChange(null)
//                setCommentText('')
//             }
//         } catch (err) {
//             alert("We can't change comment for this post :(")
//         }
//     }

//     const removeComment = async (commentId) =>{
//         try {
//             const {data} = await axios.delete(`posts/${postId}/comments/${commentId}`)
//                 if(data.success){
//                     // router
//             }
//         } catch (err) {
//             alert("We can't remove comment for this post :(")
//         } 
//     }


//     return(<>{post
//         ?<><div className={styles.post}>
//                 {post.imgUrl
//                 ?<img className={styles.img}  src={process.env.NEXT_PUBLIC_URL_REQUEST + post.imgUrl} alt={'Post'}/> 
//                 :null
//                 }
//                 <div className={styles.info}>
//                     <div><CgProfile className={styles.person} style={{color: `${post.user.color}`}}/></div>
//                     <div>
//                         <Link className={styles.name} href={`/user/${post.user._id}`}>{post?.user.name}</Link>
//                         <div className={styles.title}>{post.title}</div>
//                         {post?.tags !== undefined && post.tags.length
//                         ? post.tags.map((tag) => <p className={styles.tagItem}>#{tag}</p>)
//                         : null}
//                         <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{post.text}</ReactMarkdown>
//                         <div className={styles.icons}>
//                             <div className={styles.iconItem}><AiOutlineEye /> {post.views}</div> 
//                             <div className={styles.iconItem}><BiComment /> {post.comments.length}</div>
//                         </div>
//                         <button className={styles.back} onClick={() => navigate('/posts')}>Back</button>
//                         {user && user._id === post.user._id
//                         ?<>
//                             <RiDeleteBin6Line  className={styles.deletePost} onClick={() => deletePost()}/>
//                             <RiEdit2Line className={styles.changePost} onClick={() => router.push(`/posts/${postId}/edit`)}/>
//                         </>
//                         :null}
//                     </div>
//                 </div>
//         </div>
//         <div className={styles.comments}>
//             <div className={styles.block}>Comments</div>
//             <div className={styles.commentAdd}>
//                 <CgProfile className={styles.person}/>
//                 <input className={styles.Input}   ref={textInput} value={commentText} type={'text'} placeholder='Enter comment...' onChange={(e) => setCommentText(e.target.value)}/>
//             </div> 
    
//             {commentText.length && !change
//             ? <button className={styles.btn} onClick={() => createComment()}>Submit</button>
//             : null}
    
//             {commentText.length && change
//             ? <div className={styles.changeBtns}>
//                 <button className={styles.cancel} onClick={() => cancel()}>Cancel</button>
//                 <button className={styles.btn} onClick={() => changeComment()}>Change</button>
//               </div>
//             : null}
    
//             {post && comments.length 
//             ? comments.map((comment) => (
//                 <div className={styles.commentItem} key={comment._id}>
//                     <div className={styles.commentPerson}>
//                         <Link href={`/user/${comment?.user._id}`}><CgProfile className={styles.personComment} style={{color: `${comment.user.color}`}}/></Link>  
//                         <Link className={styles.commentName} href={`/user/${comment?.user._id}`}>{comment?.user.name}</Link> 
//                     </div>
//                     <div className={styles.commentText}>{comment.text}</div> 
    
//                 {user && user._id === comment.user._id 
//                 ?<div>
//                     <RiDeleteBin6Line className={styles.delete} onClick={() => removeComment(comment._id)}/> 
//                     <RiEdit2Line className={styles.edit} onClick={() => {meddlewareChangeComment(comment._id, comment.text)}}/> 
//                 </div>
//                 : null
//                 }
    
//             </div>
//             ))
//             :null 
//             }
//         </div>
//         </>
//         :null
//         }
//         </>)

// }
 
// export default Post;


// export async function getServerSideProps({query}) {

//     const post = await axios.get(`/posts/${query.id}`)
//     const comments = await axios.get(`/comments/${query.id}`)

//     return {
//       props: {
//         post: post.data.post,
//         comments: comments.data.list
//       }
//     }
//   }