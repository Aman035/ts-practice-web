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

export interface IAttributes<T> {
  get<K extends keyof T>(propName: K): T[K]
  set(updatedProps: T): void
  getAll(): T
}

export interface ISync<T> {
  fetch(id: number): Promise<T>
  save(data: T): Promise<T>
}

export interface IEvents {
  on(eventName: string, callback: Callback): void
  trigger(eventName: string): void
}
