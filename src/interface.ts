export interface SerializeModel<T> {
  originalName: string
  serializeName: string
  value: T
}

export interface Dictionary<T> {
  [x: string]: T
}
