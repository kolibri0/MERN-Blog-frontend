import styles from '../styles/post.module.css'

const PostBtns = ({commentText, change, addComment, cancel, changeComment}) => {
    return ( 
    <>
    {
    commentText.length && !change
    ? <button className={styles.btn} onClick={() => addComment()}>Submit</button>
    : null
    }
    {
    commentText.length && change
    ? <div className={styles.changeBtns}>
        <button className={styles.cancel} onClick={() => cancel()}>Cancel</button>
        <button className={styles.btn} onClick={() => changeComment()}>Change</button>
      </div>
    : null
    }
    </>
    );
}
 
export default PostBtns;