import StateController from "./StateController";
import produceAnimation, {produceCompleteAnimation} from "../animations/produce";
import idleAnimation from "../animations/idle";


export default class Idle extends StateController {

  static update({building, delta}) {
    StateController.update({building, delta});
  }

  static onComplete({building}) {
    if (building.prevStateProgress === 1) return;
  }

  static apply({building, force}) {
    StateController.apply({building});

    building._clearAnimation = idleAnimation(building, force);
  }
}
