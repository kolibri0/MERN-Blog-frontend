import styles from '../styles/blog.module.css'
import React from 'react';
import '../types'

interface IProps{
  getByType: (type: string) => Promise<boolean>
}

const Categories: React.FC<IProps> = ({getByType}) => {
    return ( 
    <div className={styles.category}>
        <div className={styles.categoryItem} onClick={() => getByType('')}>None</div>
        <div className={styles.categoryItem} onClick={() => getByType('new')}>New</div>
        <div className={styles.categoryItem} onClick={() => getByType('popular')}>Popular</div>
    </div>
    );
}
export default Categories;