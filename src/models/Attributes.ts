// **<T extends object>**
// To tell TS that T is an obj so that it does not throw any error using Object.assign
export class Attributes<T extends object> {
  constructor(private data: T) {}

  // **VIMP**
  // K type specify that fn takes only key of T
  // Fn rutrns the key values of T
  get = <K extends keyof T>(propName: K): T[K] => {
    return this.data[propName]
  }
  set = (updatedProps: T): void => {
    Object.assign(this.data, updatedProps)
  }
  getAll = (): T => {
    return this.data
  }
}
