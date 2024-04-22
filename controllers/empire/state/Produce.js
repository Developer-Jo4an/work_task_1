import StateController from "./StateController";
import produceAnimation, {produceCompleteAnimation} from "../animations/produce";


export default class Produce extends StateController {


  static update({building, delta}) {
    StateController.update({building, delta});

    const progress = this.getStateProgress(building);

    if (building.prevStateProgress > progress) {
      this.clearAnimation(building);
      building._clearAnimation = produceAnimation(building);
    }

    building.stateProgress = progress
  }

  static onComplete({building}) {
    if (building.prevStateProgress === 1) return;

    this.clearAnimation(building);

    building._clearAnimation = produceCompleteAnimation(building);
  }

  static apply({building, force}) {
    StateController.apply({building});

    building._clearAnimation = produceAnimation(building, force);
  }

  static getStateProgress(building) {
    const {
      stateData: {produce_start},
      improvementLevel
    } = building;

    const settings = this.getBuildingSettings(building);

    if (!settings) return 0;

    let {production_time} = settings.improvements[improvementLevel];

    production_time = production_time ?? Number.MAX_VALUE;

    return Math.max(0, Math.min(1, (Date.now() - produce_start * 1000) / (production_time * 1000)));
  }
}
