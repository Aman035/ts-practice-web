import { IUserProps, Callback } from '../types'
import axios from 'axios'
import { config } from '../config'

export class User {
  // event is an obj where each key is a string and mapped value for every key is an array of Callback fn
  events: { [key: string]: Callback[] } = {}

  constructor(private data: IUserProps) {}

  get(propName: string): string | number {
    return this.data[propName]
  }
  set(updatedProps: IUserProps): void {
    Object.assign(this.data, updatedProps)
  }
  on(eventName: string, callback: Callback): void {
    const handler = this.events[eventName] || []
    handler.push(callback)
    this.events[eventName] = handler
  }
  trigger(eventName: string): void {
    const handler = this.events[eventName]
    if (handler && handler.length !== 0) {
      handler.forEach((callback: Callback) => {
        callback()
      })
    }
  }
  async fetch(): Promise<IUserProps> {
    const user: IUserProps = (
      await axios.get(`${config.backendUrl}/users/${this.get('id')}`)
    ).data
    return user
  }
  async save(): Promise<void> {
    const id = this.get('id')
    if (id) {
      //update or PUT
      await axios.put(`${config.backendUrl}/users/${this.get('id')}`, this.data)
    } else {
      // POST
      await axios.post(`${config.backendUrl}/users/`, this.data)
    }
  }
}
