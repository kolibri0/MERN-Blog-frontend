import { IUser } from "./IUser"

export interface IPost{
    _id: string,
    title: string,
    text: string,
    user: IUser,
    tags?: string[] | [],
    imgUrl?: string,
    comments: IComment[] | [],
    views: number
}

export interface IComment{
    _id: string,
    text: string,
    user: IUser
}