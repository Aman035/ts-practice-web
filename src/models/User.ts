import { IUserProps } from '../types'
import { config } from '../config'
import { Eventing } from './Eventing'
import { Sync } from './Sync'
import { Attributes } from './Attributes'

const rootUrl = `${config.backendUrl}/users`
export class User {
  // **Hard Coded**
  // Reason for hardcoding it rather than providing as an argument in constructor
  // is event model class is going to have some events associated with it.
  // There does not exist any case where we will want to switch eventing
  // class with any other class
  events: Eventing = new Eventing()

  // **Hard Coded**
  // Although this can be changed as a contructor arg enabling us to switch
  // one usecase can be we have a diff class which sync data to local storage on frontend
  sync: Sync<IUserProps> = new Sync<IUserProps>(rootUrl)

  constructor(public attributes: Attributes<IUserProps>) {}
}
