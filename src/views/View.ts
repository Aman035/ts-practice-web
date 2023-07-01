import { Model } from '../models/Model'
import { IHasId } from '../types'
export abstract class View<T extends Model<K>, K extends IHasId> {
  /**
   * @param parent specifies parent HTML element to which view will be appended
   */
  constructor(public parent: Element, public model: T) {
    this.bindModal()
  }

  abstract eventsMap(): { [key: string]: () => void }
  abstract template(): string

  /**
   * Renders View whenever change event is called
   */
  bindModal = () => {
    this.model.on('change', () => {
      this.render()
    })
  }

  /**
   * Bind events to all the elements
   * @param fragment Document Fragment
   */
  bindEvents = (fragment: DocumentFragment): void => {
    const events = this.eventsMap()
    for (let eventsKey in events) {
      const [event, selector] = eventsKey.split(':')
      fragment.querySelectorAll(selector).forEach((each: Element) => {
        each.addEventListener(event, events[eventsKey])
      })
    }
  }

  /**
   * Renders the template as child of parent element
   */
  render = (): void => {
    // 1. Clear Parent element ( otherwise it creates issue in rerenders )
    this.parent.innerHTML = ''
    // 2. Create a html element
    const templateElement = document.createElement('template')
    // 3. Attach html to the element
    templateElement.innerHTML = this.template()
    // 4. Bind Some Events to the html elements
    this.bindEvents(templateElement.content)
    // 5. Append it as child of parent element
    this.parent.append(templateElement.content)
  }
}
