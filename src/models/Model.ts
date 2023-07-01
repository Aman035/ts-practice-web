import { IAttributes, IEvents, IHasId, ISync } from '../types'

export class Model<T extends IHasId> {
  // private variables with defined interfaces to enable smooth swapping of classes
  constructor(
    private attributes: IAttributes<T>,
    private sync: ISync<T>,
    private events: IEvents
  ) {}

  //getter accessors
  // This is a better approach rather than defining functions since it requires much less code writing and relies on referencing
  get get() {
    return this.attributes.get
  }
  // or use ShortHand
  // get = this.attributes.get

  get on() {
    return this.events.on
  }
  // or use ShortHand
  // get = this.events.on
  get trigger() {
    return this.events.trigger
  }
  // or use ShortHand
  // get = this.events.trigger

  /**
   * Sets data and triggers change event
   * Change event is used for state updatation in this web framework
   * @param updateProps
   */
  set(updateProps: T): void {
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
