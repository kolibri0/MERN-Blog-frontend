import { CgProfile } from 'react-icons/cg'
import { AiOutlineEye } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import {Link, } from 'react-router-dom'

import styles from '../blog.module.css'
import React from 'react'


interface IProps{
    id: number,
    name: string,
    title: string,
    userId: number,
    views: number,
    comments: any[],
    img: string | null,
    tags: string[] | undefined,
    getByTag?: any,
    colorUser: string
}

const BlogListItem: React.FC<IProps> = ({id, name, title, userId, views, comments, img, tags, getByTag, colorUser}) => {


    return(<div className={styles.postItem}>
            {img
            ? <Link to={`/posts/${id}`}><img className={styles.img} width={750} height={300} src={img}/></Link> 
            :null
            }
            <div className={styles.info}>
                <div><CgProfile className={styles.person} style={{color: `${colorUser}`}}/></div>
                <div>
                    <Link className={styles.name} to={`/user/${userId}`}>{name}</Link>
                    <Link className={styles.title} to={`/posts/${id}`}>{title}</Link>
                    {tags
                     ? tags.map((tag: string, i: number) => i<8 ? <p className={styles.tagItem} key={i} onClick={() => getByTag(tag)}>#{tag}</p> : null)
                     : null
                    }
                    <div className={styles.icons}>
                        <div className={styles.iconItem}><AiOutlineEye /> {views}</div> 
                        <div className={styles.iconItem}><BiComment /> {comments?.length}</div>
                    </div>
                </div>
            </div>
    </div>)
}

export default BlogListItem