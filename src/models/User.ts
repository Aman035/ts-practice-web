import { IUserProps } from '../types'
import { config } from '../config'
import { Eventing } from './Eventing'
import { ApiSync } from './ApiSync'
import { Attributes } from './Attributes'
import { Modal } from './Modal'
import { Collection } from './Collection'

const rootUrl = `${config.backendUrl}/users`
/**
 * User Class which is a child class of Modal ( Inheritence )
 */
export class User extends Modal<IUserProps> {
  static buildUser(data: IUserProps): User {
    // when we don't define any contructor it takes automatically from parent class
    // otherwise have a constructor with super fn
    return new User(
      new Attributes<IUserProps>(data),
      new ApiSync<IUserProps>(rootUrl),
      new Eventing()
    )
  }
  static buildUserCollection(): Collection<User, IUserProps> {
    return new Collection(rootUrl, (json: IUserProps) => {
      return User.buildUser(json)
    })
  }
}
