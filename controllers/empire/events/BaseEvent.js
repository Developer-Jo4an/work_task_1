import {breakCount} from "../../../constants/empire";

export default class BaseEvent {

  eventBus;

  breakType = "unknown"

  breakCount = breakCount;

  requestBuildingsByType(type) {
    const event = {type: "request-buildings", data: {type, ignoreBroken: true, ignoreConstruction: true}};

    this.eventBus.dispatchEvent(event);

    return event;
  }

  requestBreakBuildings(type, buildings) {

    return new Promise((resolve, reject) => {
      this.eventBus.dispatchEvent({
        type: "request-break-buildings",
        data: {resolve, reject, buildings, type, signature: this.breakType}
      })
    })
  }

  checkBuildingsByType() {
    const {data: {result: buildings}} = this.requestBuildingsByType(this.breakType);

    while (buildings.length > this.breakCount)
      buildings.splice(Math.round(Math.random() * buildings.length), 1);

    return {canApply: !!buildings.length, buildings};
  }

  checkCanApply(canApply = true) {
    return {canApply};
  }

  beforeApply() {
    return Promise.resolve();
  }

  apply() {
    const data = this.checkCanApply();

    if (!data.canApply) return data;

    this.beforeApply(data)
      .then(() => this.onApply(data))
      .then(() => this.afterApply(data))

    return data
  }

  onApply() {
  }

  afterApply() {
  }
}
