import { User } from './models/User'
import { UserList } from './views/UserList'

const userCollection = User.buildUserCollection()
userCollection.on('change', () => {
  const rootElement = document.getElementById('root')
  if (rootElement) {
    new UserList(rootElement, userCollection).render()
  } else {
    throw new Error('root Element not found')
  }
})
userCollection.fetch()
