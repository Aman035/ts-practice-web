export interface IUserProps {
  //added by backend server
  id?: number
  name?: string
  age?: number
}

export interface IHasId {
  id?: number
}

export type Callback = () => void