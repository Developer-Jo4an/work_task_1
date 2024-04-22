import BaseEvent from "./BaseEvent";
import {breakCount} from "../../../constants/empire";

export default class Snowstorm extends BaseEvent {

  breakType = "office";

  breakCount = breakCount;

  checkCanApply() {
    return this.checkBuildingsByType()
  }

  beforeApply(data) {
    console.log("beforeApply Snowstorm", data)
    const type = "snowstorm"
    return (new Promise(resolve => {
      this.eventBus.dispatchEvent({type: "event:apply", data: {type, data, onComplete: resolve}})
    })).then(() => {
      this.eventBus.dispatchEvent({type: "event:remove-effect", data: {type}});
      this.requestBreakBuildings(type, data.buildings);
    })
  }

  onApply(data) {
    console.log("onApply Snowstorm", data)
    super.onApply(data);
  }

  afterApply() {
    console.log("afterApply Snowstorm")
  }
}
