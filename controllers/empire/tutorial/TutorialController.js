import FirstField from "./steps/FirstField";
import FirstFactory from "./steps/FirstFactory";
import FirstStore from "./steps/FirstStore";
import FirstRoad from "./steps/FirstRoad";

export class TutorialController {

  steps = [];

  _currentStep = null;

  constructor({steps}) {
    this.steps = steps;
  }

  check(data) {

    let isBaseCompleted;

    try {
      isBaseCompleted = localStorage.getItem("empireTutorial");
    } catch (e) {

    }

    this.currentStep = this.steps.find(step => step.check(data));

    if (isBaseCompleted) this.currentStep?.baseTutorialResolver?.();


    if (!this.currentStep && this.eventBus)
      setTimeout(() => this.eventBus.dispatchEvent({type: "complete-tutorial"}));
  }

  set currentStep(currentStep) {
    if (this._currentStep === currentStep) return;
    const previousStep = this._currentStep;
    this._currentStep = currentStep;
    if (previousStep)
      previousStep.disable();
    if (currentStep)
      currentStep.run();
  }

  get currentStep() {
    return this._currentStep;
  }

  attach({eventBus, storage}) {
    this.eventBus = eventBus;
    this.steps.forEach(step => step.attach({eventBus, storage}))
  }
}

const tutorialController = new TutorialController({
  steps: [
    new FirstField(),
    new FirstFactory(),
    new FirstStore(),
    new FirstRoad(),
  ]
});

export default tutorialController;
