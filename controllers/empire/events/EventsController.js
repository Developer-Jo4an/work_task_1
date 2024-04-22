import {getTimestamp} from "../../../utils/empire/data";

export default class EventsController {

  eventsCollection = [];

  cEventsCollection = [];

  prevRun = null;

  constructor({eventBus, storage}) {

    this.storage = storage;
    this.eventBus = eventBus;
  }

  addEvent(event) {
    event.eventBus = this.eventBus;
    this.eventsCollection.push(event);
  }

  updateTime(prevRun = 0) {
    this.prevRun = prevRun;
  }

  update() {
    const {storage: {eventsPeriod}, prevRun} = this;
    if (this.storage.state.passed_tutorial && eventsPeriod !== null && getTimestamp() >= prevRun + eventsPeriod) this.runEvent();
  }

  runEvent(isRetry = false) {
    if (!this.cEventsCollection.length)
      this.cEventsCollection = [...this.eventsCollection];

    const [event] = this.cEventsCollection.splice(Math.floor(Math.random() * this.cEventsCollection.length), 1);

    if (!event) return;

    const {canApply} = event.apply();

    if (!canApply) {
      if (isRetry && !this.cEventsCollection.length) return;

      if (!isRetry)
        this.cEventsCollection = [...this.eventsCollection].filter(e => event !== e);

      return this.runEvent(true);
    }


    this.prevRun = getTimestamp();
  }
}
