import { User } from './models/User'

const create = async () => {
  const user = User.buildUser({ name: 'aman', age: 22, id: 1 })
  user.on('change', () => {
    console.log(user)
  })
  await user.fetch()
}
create()
