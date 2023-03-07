import styles from '../styles/blog.module.css'
import React from 'react';
import '../types'

const Categories: React.FC<any> = ({getByType}) => {
    return ( 
    <div className={styles.category}>
        <div className={styles.categoryItem} onClick={() => getByType('')}>None</div>
        <div className={styles.categoryItem} onClick={() => getByType('new')}>New</div>
        <div className={styles.categoryItem} onClick={() => getByType('popular')}>Popular</div>
    </div>
    );
}
export default Categories;