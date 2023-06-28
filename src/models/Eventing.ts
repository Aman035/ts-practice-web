import { Callback } from '../types'

/**
 * Class for Adding and Triggering Events
 */
export class Eventing {
  // event is an obj where each key is a string and mapped value for every key is an array of Callback fn
  events: { [key: string]: Callback[] } = {}

  /**
   * Specify a event and its callback
   * Note: An event can have multiple callbacks
   * @param eventName
   * @param callback
   */
  on(eventName: string, callback: Callback): void {
    const handler = this.events[eventName] || []
    handler.push(callback)
    this.events[eventName] = handler
  }
  /**
   * Trigers a specific event
   * @param eventName
   */
  trigger(eventName: string): void {
    const handler = this.events[eventName]
    if (handler && handler.length !== 0) {
      handler.forEach((callback: Callback) => {
        callback()
      })
    }
  }
}
