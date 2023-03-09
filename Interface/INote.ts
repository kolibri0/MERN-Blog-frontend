export interface INote{
  _id: string,
  text: string,
  title: string,
}

export interface IcreateNote{
  text: string,
  title: string,
}

export interface IchangeNote{
  text: string,
  title: string,
  id: string | string[] | undefined,
}