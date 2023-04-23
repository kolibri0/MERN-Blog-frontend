import * as React from 'react';
import { IUser } from '../Interface/IUser';
import { IPost } from '../Interface/IPost';

interface IProps {
  styles: any,
  user: IUser,
  posts: IPost[]
}

const UserInfoBlock: React.FC<IProps> = ({ styles, user, posts }) => {
  return (
    <div className={styles.userInfo}>
      <div className={styles.infoItem}>User Name: {user.name}</div>
      <div className={styles.hr} />
      <div className={styles.infoItem}>Count user posts: {posts.length}</div>
      <div className={styles.hr} />
      <div className={styles.infoItem}>User Followers: {user.followers.length}</div>
      <div className={styles.hr} />
      <div className={styles.infoItem}>About me: {user.aboutMe ?? 'No info'}</div>
    </div>
  )
}


export default UserInfoBlock