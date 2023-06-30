import { Attributes } from './models/Attributes'
import { User } from './models/User'
import { IUserProps } from './types'

const create = async () => {
  const user = new User(new Attributes<IUserProps>({ id: 1, age: 0 }))
  user.on('save', () => {
    console.log('User was saved')
  })
  // await user.set({ name: 'New Name' })
  await user.save()
}
create()
