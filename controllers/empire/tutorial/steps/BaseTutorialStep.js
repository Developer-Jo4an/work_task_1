export default class BaseTutorialStep {

  _state = "idle";

  constructor() {

    this.baseTutorialPromise = new Promise(resolve => this.baseTutorialResolver = resolve);
  }

  run() {

  }

  attach({storage, eventBus}) {
    this.storage = storage;
    this.eventBus = eventBus;
  }

  set state(state) {
    this._state = state;

    this.runState();
  }

  get state() {
    return this._state;
  }

  runState() {
    this[`${this.state}Select`]?.();
  }

  check() {

  }

  disable() {

  }

  apply() {
    return Promise.resolve();
  }
}
