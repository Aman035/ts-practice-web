import { User } from '../models/User'
import { IUserProps } from '../types'
import { UserForm } from './UserForm'
import { UserShow } from './UserShow'
import { View } from './View'

export class UserEdit extends View<User, IUserProps> {
  regionsMap = (): { [key: string]: string } => {
    return {
      userShow: '.user-show',
      userForm: '.user-form',
    }
  }

  onRender = (): void => {
    // render UserShow as child of .userShow div
    new UserShow(this.regions.userShow, this.model).render()
    // render UserForm as child of .userForm div
    new UserForm(this.regions.userForm, this.model).render()
  }

  template(): string {
    return `
        <div>
            <div class="user-show"></div>
            <div class="user-form"></div>
        </div>
        `
  }
}
