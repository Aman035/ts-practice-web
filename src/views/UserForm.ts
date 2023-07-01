import { User } from '../models/User'

export class UserForm {
  /**
   * @param parent specify the parent html element to which UserForm will be appended as chld
   */
  constructor(public parent: Element, public model: User) {
    this.bindModal()
  }

  /**
   * Rerenders UserForm on change
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
   * @returns Mapping of all events
   */
  eventsMap = (): { [key: string]: () => void } => {
    return {
      // <event>:<className> mapping ( can be done for atgs or id etc )
      'click:.set-age': this.setAgeClick,
      'click:.set-name': this.setNameClick,
    }
  }

  /***********************EVENTS*****************************/
  setAgeClick = (): void => {
    this.model.setRandomAge()
  }

  setNameClick = (): void => {
    const input = this.parent.querySelector('input')
    if (input) {
      const name = input.value
      this.model.set({ name })
    }
  }
  /***********************EVENTS*****************************/

  /**
   * @returns A template HTML string
   */
  template = (): string => {
    return `
        <div>
            <h1>User Form</h1>
            <h3>User Name : ${this.model.get('name')}</h3>
            <h3>User Age : ${this.model.get('age')}</h3>
            <input/>
            <button class="set-name">Set Name</button>
            <button class="set-age">Set Age</button>
        </div>
        `
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
