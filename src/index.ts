import { User } from './models/User'
import { UserEdit } from './views/UserEdit'
import { UserForm } from './views/UserForm'

const rootElement = document.getElementById('root')
if (rootElement) {
  const userEdit = new UserEdit(
    rootElement,
    User.buildUser({ name: 'NAME', age: 20 })
  )
  userEdit.render()
  console.log(userEdit)
} else {
  throw new Error('root Element not found')
}
