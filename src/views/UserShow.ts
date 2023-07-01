import { User } from '../models/User'
import { IUserProps } from '../types'
import { View } from './View'

export class UserShow extends View<User, IUserProps> {
  template(): string {
    return `
        <div>
            <h1>User Details</h1>
            <h4>Name : ${this.model.get('name')}</h4>
            <h4>Age : ${this.model.get('age')}</h4>
        </div>
        `
  }
}
