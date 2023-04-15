import { Dictionary } from './interface'
import { Validation } from './validation'

export class Model {
  private data: Dictionary<Validation<unknown>>

  constructor(data: Dictionary<Validation<unknown>>) {
    this.data = data
  }

  validate(isSerialize = true) {
    return {
      data: isSerialize ? this.getSerialize() : this.getDeserialize(),
      error: this.getParamsError(),
    }
  }

  private getParamsError() {
    return Object.entries(this.data).reduce((acc, [_, v]) => {
      const { error } = v.getModel()
      acc.push(...error)
      return acc
    }, [])
  }

  getSerialize() {
    return Object.entries(this.data).reduce((acc, [k, v]) => {
      const { data } = v.getModel()
      acc[k] = data
      return acc
    }, {})
  }

  getDeserialize() {
    return Object.entries(this.data).reduce((acc, [_, v]) => {
      const { data, deserializeName } = v.getModel()
      acc[deserializeName] = data
      return acc
    }, {})
  }
}

export const szModel = <T>(data: Dictionary<Validation<T>>) => new Model(data)
