export default class BaseDecorator {

  define(target, property, get, set) {
    const attributes = {get, set};

    Object.defineProperty(target, property, attributes)
  }
}
