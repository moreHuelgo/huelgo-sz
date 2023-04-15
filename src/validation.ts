export class Validation<T> {
  private model = {
    data: null,
    deserializeName: null,
    error: [],
  }

  set(data: T, name: string) {
    this.model.data = data
    this.model.deserializeName = name
    return this
  }

  array() {
    const { data, error, deserializeName } = this.model
    if (data?.legnth < 1) {
      error.push(`${deserializeName} is not array type`)
    }

    return this
  }

  number() {
    const { data, error, deserializeName } = this.model
    if (typeof data !== 'number') error.push(`${deserializeName} is not number type`)
    return this
  }

  string() {
    const { data, error, deserializeName } = this.model
    if (typeof data !== 'string') error.push(`${deserializeName} is not string type`)

    return this
  }

  max(len: number) {
    const { data, error, deserializeName } = this.model
    if (data?.legnth > len) error.push(`${deserializeName} more than ${len}`)

    return this
  }

  min(len: number) {
    const { data, error, deserializeName } = this.model
    if (data?.legnth > len) error.push(`${deserializeName} less than ${len}`)
    return this
  }

  required() {
    const { data, error, deserializeName } = this.model
    if (!data) error.push(`${deserializeName} is required`)
    return this
  }

  getModel() {
    return this.model
  }

  /**
   * @desc 해당 파람이 존재할 시 required , 존재하지 않을때는 optional
   */
  whenOptional(param: unknown) {
    const { data, error, deserializeName } = this.model
    if (param && !data) {
      error.push(`${deserializeName} is required (reference)`)
    }
    return this
  }

  include(params: unknown[]) {
    const { data, error, deserializeName } = this.model

    if (!params.some((item) => item === data)) error.push(`${deserializeName} is not include "${params}}"`)
    return this
  }

  email() {
    const { data, error, deserializeName } = this.model
    if (!RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(data)) {
      error.push(`${deserializeName} is not email`)
    }
    return this
  }
}

export const szParam = <T>() => new Validation<T>()
