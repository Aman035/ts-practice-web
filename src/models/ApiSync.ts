import axios from 'axios'
import { IHasId } from '../types'

/**
 * Generic Class Sync to Save and Fetch Data from DB
 * Reason for making this generic - To use with diff classes where data has specific structure acc to a class
 * Note - Acc to me since Every class can have HAS relationship with Sync we could also make it abstract class with the data as a abstract property.
 * Perosnal Thought - Generally we don't seem to use abstract classes since it limits the use of class directly and also restricts us from testing the class in isolation.
 */
// **<T extends IHasId>**
// to make sure T has an optional property called id to avoid Ts errors
export class ApiSync<T extends IHasId> {
  constructor(public rootUrl: string) {}

  fetch = async (id: number): Promise<T> => {
    const user: T = (await axios.get(`${this.rootUrl}/${id}`)).data
    return user
  }
  save = async (data: T): Promise<T> => {
    const { id } = data
    if (id) {
      //update or PUT
      return await axios.put(`${this.rootUrl}/${id}`, data)
    } else {
      // POST
      return await axios.post(`${this.rootUrl}/`, data)
    }
  }
}
