import { IComment, IPost } from "./IPost"
import { IUser } from "./IUser"
import * as React from 'react';

export interface ITag{
  tags: string[],
  getByTag: (tag: string) => Promise<boolean>,
  styles: any
}

export interface IPostBtns{
  commentText: string,
  change: boolean,
  cancel: () => void,
  addComment: () => Promise<void>,
  changeComment: () => Promise<void>,
}

export interface ICommentItem{
  comment: IComment,
  removeComment: (comment: string) => Promise<void>,
  middlewareChangeComment: (id: string, text: string) => void,
  user: IUser | null
}

export interface IPostInfo{
  post: IPost,
  user: IUser | null,
  getByTag: (tag: string) => Promise<boolean>,
  back: () => void,
  removePost: () => Promise<void>,
  redirectToEdit: () => Promise<boolean>,
}

export interface IBlogForm{
  onSubmit: () => Promise<void>,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  removeImgUrl: () => void,
  onChange: (text: string) => void,
  changedInput: (event: any) => Promise<void>,
  setTags: React.Dispatch<React.SetStateAction<string>>,
  text: string,
  title: string,
  imgUrl: string,
  inputFileRef: any,
  tags: string,
}

// export interface

export interface IBlogItem{
  id: string,
  name: string,
  title: string,
  userId: string,
  views: number,
  comments: IComment[],
  img: string | null,
  tags: string[] | [] | undefined,
  colorUser: string,
  getByTag: (tag: string) => Promise<boolean>,
}