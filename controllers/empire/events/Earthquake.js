import BaseEvent from "./BaseEvent";
import {breakCount} from "../../../constants/empire";

export class Earthquake extends BaseEvent {

  breakType = "store"

  breakCount = breakCount;

  checkCanApply() {
    return this.checkBuildingsByType()
  }

  beforeApply(data) {
    console.log("beforeApply Earthquake", data)
    const type = "earthquake"
    return (new Promise(resolve => {
      this.eventBus.dispatchEvent({type: "event:apply", data: {type, data, onComplete: resolve}})
    })).then(() => {
      this.eventBus.dispatchEvent({type: "event:remove-effect", data: {type}});
      this.requestBreakBuildings(type, data.buildings);
    })
  }

  onApply(data) {
    console.log("onApply Earthquake", data)
    super.onApply(data);
  }

  afterApply() {
    console.log("afterApply Earthquake")
  }
}
