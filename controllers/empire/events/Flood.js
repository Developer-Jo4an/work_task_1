import BaseEvent from "./BaseEvent";
import {breakCount} from "../../../constants/empire";

export default class Flood extends BaseEvent {

  breakType = "factory";

  breakCount = breakCount;

  checkCanApply() {
    return this.checkBuildingsByType()
  }

  beforeApply(data) {
    console.log("beforeApply Flood", data)
    const type = "flood"
    return (new Promise(resolve => {
      this.eventBus.dispatchEvent({type: "event:apply", data: {type, data, onComplete: resolve}})
    })).then(() => {
      this.eventBus.dispatchEvent({type: "event:remove-effect", data: {type}});
      this.requestBreakBuildings(type, data.buildings);
    })
  }

  onApply(data) {
    console.log("onApply Flood", data)
    super.onApply(data);
  }

  afterApply() {
    console.log("afterApply Flood")
  }
}
