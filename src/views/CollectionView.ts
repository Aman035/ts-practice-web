import { Collection } from '../models/Collection'

export abstract class CollectionView<T, K> {
  /**
   * @param parent specifies parent HTML element to which view will be appended
   */
  constructor(public parent: Element, public collection: Collection<T, K>) {}

  abstract renderItem(ItemParent: Element, model: T): void

  /**
   * Renders the template as child of parent element
   */
  render = (): void => {
    this.parent.innerHTML = ''
    this.collection.models.forEach((each) => {
      const templateElement = document.createElement('div')
      this.renderItem(templateElement, each)
      this.parent.append(templateElement)
    })
  }
}
