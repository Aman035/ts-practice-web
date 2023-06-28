// **<T extends object>**
// To tell TS that T is an obj so that it does not throw any error using Object.assign
export class Attributes<T extends object> {
  constructor(private data: T) {}

  get(propName: string): string | number {
    return this.data[propName]
  }
  set(updatedProps: T): void {
    Object.assign(this.data, updatedProps)
  }
}
