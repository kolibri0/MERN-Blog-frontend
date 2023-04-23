import Link from "next/link"
import { CgProfile } from "react-icons/cg"
import * as React from 'react';
import { IFollow } from "../Interface/IFollow";

interface IProps {
  styles: any,
  user: IFollow
}

const UserItem: React.FC<IProps> = ({ styles, user }) => {
  return (
    <Link className={styles.userItem} href={`/user/${user._id}`}>
      <div>
        <CgProfile className={styles.profileIcon} color={user.color} />
      </div>
      <div>
        <div>{user.name}</div>
      </div>
    </Link>
  )
}


export default UserItem