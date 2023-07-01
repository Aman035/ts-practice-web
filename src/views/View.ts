import { Model } from '../models/Model'
import { IHasId } from '../types'
export abstract class View<T extends Model<K>, K extends IHasId> {
  regions: { [key: string]: Element } = {}
  /**
   * @param parent specifies parent HTML element to which view will be appended
   */
  constructor(public parent: Element, public model: T) {
    this.bindModal()
  }

  abstract template(): string

  // default implementation
  // most of the time will be overridden by child classes
  // mapping of regionName to selector ( used for nesting elements )
  regionsMap = (): { [key: string]: string } => {
    return {}
  }

  // default implementation
  // most of the time will be overridden by child classes
  eventsMap = (): { [key: string]: () => void } => {
    return {}
  }
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
   * Poulate regions ( used for nesting )
   */
  mapRegions = (fragment: DocumentFragment): void => {
    const regionsMap = this.regionsMap()
    for (let regionkey in regionsMap) {
      const element = fragment.querySelector(regionsMap[regionkey])
      if (element) {
        this.regions[regionkey] = element
      }
    }
  }

  // default implementation
  // to provide child classes some custom nested rendering logic
  onRender = (): void => {}

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
    // 5. Populate all the regions
    this.mapRegions(templateElement.content)
    // 6. Render nested elements
    this.onRender()
    // 7. Append it as child of parent element
    this.parent.append(templateElement.content)
  }
}
