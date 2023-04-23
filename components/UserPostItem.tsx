import Link from "next/link"
import * as React from 'react';
import { AiOutlineEye } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { IPost } from "../Interface/IPost";


interface IProps {
  styles: any,
  post: IPost,
  getByTag: (tag: string) => Promise<boolean>
}


const UserPostItem: React.FC<IProps> = ({ styles, post, getByTag }) => {


  return (
    <>
      <div className={styles.post}>
        <div className={styles.fromLeftPost}>
          {post.imgUrl &&
            <Link href={`/posts/${post._id}`}>
              <img className={styles.img} src={process.env.NEXT_PUBLIC_URL_REQUEST + post.imgUrl} alt="" />
            </Link>
          }
        </div>
        <div className={styles.fromRightPost}>
          <Link href={`/posts/${post._id}`} className={styles.link}>
            <div className={styles.title}>{post.title?.slice(0, 50)}</div>
          </Link>
          <div className={styles.tags}>
            {post.tags?.map((tag: string) => (
              <div className={styles.tag} onClick={() => getByTag(tag)}>#{tag}</div>
            ))}
          </div>

          <div style={{ "display": 'flex' }}>
            <div className={styles.watch}><AiOutlineEye />{post.views}</div>
            <div className={styles.comment}><BiComment />{post.comments.length}</div>
          </div>

        </div>
      </div>
      <div className={styles.hr} />
    </>
  )

}


export default UserPostItem