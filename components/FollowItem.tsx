import Link from "next/link"
import { CgProfile } from "react-icons/cg"
import * as React from 'react';



const FollowItem = ({ styles, followItem, key }) => {
  return (
    <Link className={styles.follower} href={followItem._id} key={key}>
      <CgProfile fontSize={25} color={followItem.color} />
      <div className={styles.followName}>{followItem.name}</div>
    </Link>
  )
}


export default FollowItem