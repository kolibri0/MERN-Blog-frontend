import * as React from 'react';
import { ITag } from '../Interface/IProps'
const Tags: React.FC<ITag> = ({tags, getByTag, styles}) => {
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