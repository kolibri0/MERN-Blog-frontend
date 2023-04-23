import * as React from 'react';


const FollowBtn = ({ styles, user, me, meSubscribeOnUser, deleteFollow, follow, createChatWithUser }) => {

  return (
    <div className={styles.containBtn}>
      {
        user._id !== me?._id
          ? <>
            {
              me?.youFollow.some(meSubscribeOnUser)
                ? <button className={styles.unfollow} onClick={() => deleteFollow()}>Stop following</button>
                : <button className={styles.follow} onClick={() => follow()}>Follow</button>
            }
            <button className={styles.message} onClick={() => createChatWithUser()} >Message</button>
          </>
          : null
      }
    </div>
  )

}
export default FollowBtn