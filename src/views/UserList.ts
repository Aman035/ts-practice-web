import { User } from '../models/User'
import { IUserProps } from '../types'
import { CollectionView } from './CollectionView'
import { UserEdit } from './UserEdit'

export class UserList extends CollectionView<User, IUserProps> {
  renderItem = (ItemParent: Element, model: User): void => {
    new UserEdit(ItemParent, model).render()
  }
}
