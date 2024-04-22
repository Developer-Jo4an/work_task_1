import StateController from "./StateController";
import constructionAnimation from "../animations/construction";

export default class BaseConstruction extends StateController {


  static update({building, delta}) {
    StateController.update({building, delta});

    building.stateProgress = this.getStateProgress(building);
  }

  static onComplete({building}) {
    if (building.stateData._constructionComplete) return;
    building.stateData._constructionComplete = true;
    building.eventBus.dispatchEvent({type: "construction:complete", data: {cell: building.cell}});
  }

  static apply({building, force}) {
    StateController.apply({building});

    building._clearAnimation = constructionAnimation(building, force);
  }

  static getStateProgress(building) {
    const {
      improvementLevel,
      stateData: {start_upgrading}
    } = building;
    const settings = this.getBuildingSettings(building);

    if (!settings) return 0;

    const {construction_time} = settings.improvements[improvementLevel];
    return Math.max(0, Math.min(1, (Date.now() - start_upgrading * 1000) / (construction_time * 1000)));
  }
}
