export interface ICreate{
    postId: string,
    commentText: string
}

export interface IEdit{
    commentText: string,
    idChange: string
}

export interface IDelete{
    commentId: string,
    postId: string
}