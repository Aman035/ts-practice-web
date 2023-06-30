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

  //getter accessors
  // This is a better approach rather than defining functions since it requires much less code writing and relies on referencing
  get get() {
    return this.attributes.get
  }
  get on() {
    return this.events.on
  }
  get trigger() {
    return this.events.trigger
  }
  /**
   * Sets data and triggers change event
   * Change event is used for state updatation in this web framework
   * @param updateProps
   */
  set(updateProps: IUserProps): void {
    this.attributes.set(updateProps)
    this.events.trigger('change')
  }

  /**
   * Fetch data from Id and set the fetchd values. ( This also triggers event )
   */
  async fetch(): Promise<void> {
    const id = this.get('id')
    if (typeof id === 'number') {
      const data = await this.sync.fetch(id)
      this.set(data)
    } else throw new Error('Cannot fetch without id')
  }
  /**
   * Save data and trigger save event, error event on some error
   */
  async save(): Promise<void> {
    const data = this.attributes.getAll()
    try {
      await this.sync.save(data)
      this.events.trigger('save')
    } catch (err) {
      this.events.trigger('error')
    }
  }
}
