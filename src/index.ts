import { User } from './models/User'

const create = async () => {
  const userCollection = User.buildUserCollection()
  userCollection.on('change', () => {
    console.log(userCollection)
  })
  await userCollection.fetch()
}
create()
