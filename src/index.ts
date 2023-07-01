import { User } from './models/User'
import { UserForm } from './views/UserForm'

const rootElement = document.getElementById('root')
if (rootElement) {
  const userForm = new UserForm(
    rootElement,
    User.buildUser({ name: 'NAME', age: 20 })
  )
  userForm.render()
} else {
  throw new Error('root Element not found')
}
