import { User } from './models/User'

const create = async () => {
  const user = new User({ name: 'Aman', age: 22 })
  await user.save()
}
create()
