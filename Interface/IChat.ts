interface UserChat {
  name: string,
  _id: string
}

export interface IChat {
  userOne: UserChat,
  userTwo: UserChat,
  _id: string
}