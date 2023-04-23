import React from 'react';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';

const FamouseUsers: React.FC<any> = ({ styles, user }) => {
  return (
    <div className={styles.famouseItem}>
      <Link className={styles.famouseProfile} href={`/user/` + user._id}>
        <CgProfile className={styles.profileIcon} color={user.color} />
        <div>{user.name}</div>
      </Link>
      <div className={styles.followers}>followers: {user.followers}</div>
      <div className={styles.hr} />
    </div>
  );
}
export default FamouseUsers;