import BlockItem from '../components/BlogItem';
import axios from '../components/axios'
import styles from '../styles/blog.module.css'
import { useRouter } from 'next/router'
import Categories from '../components/Categories';
import Tags from '../components/Tags';

const Posts = ({posts, tags}) => {
    const router = useRouter()
    const getByTag = (tag) =>  router.push(`?tag=${tag}`)
    const getByType = (type) => type ? router.push(`?type=${type}`) : router.push(``)

    return (
    <div className={styles.container}>

        <Categories getByType={getByType} />

        <div className={styles.content}>
            <div className={styles.posts}>
                {posts
                ? posts.map((post) => <BlockItem key={post._id}
                    title={post.title} 
                    name={post.user.name} 
                    id={post._id} 
                    userId={post.user._id}
                    views={post.views}
                    comments={post.comments}
                    img={post.imgUrl ? process.env.NEXT_PUBLIC_URL_REQUEST + post.imgUrl : null}
                    tags={post.tags}
                    getByTag={getByTag}
                    colorUser={post.user.color}
                    />)
                : null
                }
            </div>
            <div className={styles.tags}>
                <Tags tags={tags} getByTag={getByTag} styles={styles}/> 
            </div>
            
        </div>
    </div>);
}
 
export default Posts;

export async function getServerSideProps({query}) {
    let posts;
    if(query.tag){
        posts = await axios.get(`/posts/params/${query.tag}`)
    }else if(query.type){
        posts = await axios.get(`/posts/${query.type}`)
    }else{
        posts = await axios.get(`/posts`)
    }
    const tags = await axios.get(`/tags`)

    return {
      props: {
        posts: posts.data.posts,
        tags: tags.data.tags
      }
    }
}