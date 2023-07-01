import axios from 'axios'
import { IEvents } from '../types'
import { Eventing } from './Eventing'

export class Collection<T, K> {
  models: T[] = []
  // 1.
  events: IEvents = new Eventing()

  constructor(private rootUrl: string, private deserialize: (json: K) => T) {}

  fetch = async (): Promise<void> => {
    const response = await axios.get(this.rootUrl)
    response.data.forEach((each: K) => {
      this.models.push(this.deserialize(each))
    })
    this.trigger('change')
  }

  //Note - Imp
  // we can't use shorthand syntax
  // on = this.events.on
  // Reason - On compiling to JS 1. runs after the above line thus giving out error ( ie use before initialization )
  get on() {
    return this.events.on
  }
  get trigger() {
    return this.events.trigger
  }
}
