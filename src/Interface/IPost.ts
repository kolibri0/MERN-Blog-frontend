import { IUser } from "./IUser"

export interface IPost{
    _id: number,
    title: string,
    text: string,
    user: IUser,
    tags?: string[],
    imgUrl?: string,
    comments: IComment[],
    views: number
}

export interface IComment{
    _id: string,
    text: string,
    user: IUser
}