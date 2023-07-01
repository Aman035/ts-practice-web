import { User } from '../models/User'
import { IUserProps } from '../types'
import { View } from './View'

export class UserForm extends View<User, IUserProps> {
  /**
   * @returns Mapping of all events
   */
  eventsMap = (): { [key: string]: () => void } => {
    return {
      // <event>:<className> mapping ( can be done for atgs or id etc )
      'click:.set-age': this.setAgeClick,
      'click:.set-name': this.setNameClick,
      'click:.save-data': this.saveData,
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

  saveData = (): void => {
    this.model.save()
  }
  /***********************EVENTS*****************************/

  /**
   * @returns A template HTML string
   */
  template = (): string => {
    return `
        <div>
            <input placeholder="${this.model.get('name')}"/>
            <button class="set-name">Set Name</button>
            <button class="set-age">Set Age</button>
            <button class="save-data">Save</button>
        </div>
        `
  }
}
