export interface IUser {
  _id: string,
  name: string,
  email: string,
  color: string,
  aboutMe?: string,
  followers?: any,
  youFollow?: any
}