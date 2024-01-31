import isUndefined from 'lodash/isUndefined'

export class Initializer {
  static number(value?: number, defaultValue = -1): number {
    if (isUndefined(value)) return defaultValue

    return value
  }

  static string(value?: string, defaultValue = '-'): string {
    if (isUndefined(value)) return defaultValue

    return value
  }

  static boolean(value?: boolean, defaultValue = false): boolean {
    if (isUndefined(value)) return defaultValue

    return value
  }

  static array<T>(value?: Array<T>, defaultValue = []): Array<T> {
    if (isUndefined(value)) return defaultValue

    return value
  }
}
