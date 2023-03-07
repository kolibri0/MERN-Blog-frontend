import { IComment, IPost } from "./IPost"
import { IUser } from "./IUser"

export interface ITag{
    tags: string[],
    getByTag: any,
    styles: any
}

export interface IPostBtns{
    commentText: string,
    change: boolean,
    cancel: any,
    addComment: any,
    changeComment: any,
}

export interface ICommentItem{
    comment: IComment,
    removeComment: any,
    middlewareChangeComment: any,
    user: IUser | null
}

export interface IPostInfo{
    post: IPost,
    user: IUser | null,
    getByTag: any,
    back: any,
    removePost: any,
    redirectToEdit: any,
}