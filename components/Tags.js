const Tags = ({tags, getByTag, styles}) => {
    return ( 
    <>
        <div className={styles.tagH2}>Tags</div>
        {tags 
            ? tags.map((tagItem) => <div className={styles.tag} onClick={() => getByTag(tagItem)}>#{tagItem}</div>)
            : null
        }
    </>
    );
}
 
export default Tags;