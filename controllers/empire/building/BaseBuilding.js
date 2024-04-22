import StateController from "../state/StateController";
import BaseConstruction from "../state/BaseConstruction";
import Produce from "../state/Produce";
import Idle from "../state/Idle";
import {getImprovementLevel, getState} from "../../../utils/empire/data";
import Pin from "../pin/Pin";

export default class BaseBuilding {

  view = null;

  stateData = null;

  idleFlag = false;

  _cell = null;

  _hiddenPins = false;

  _statesControllers = {};

  _state = null;

  _stateProgress = 0;

  _prevStateProgress = 0;

  _clearAnimation = null;

  constructor({storage, eventBus}) {
    this.onResourceItemClick = this.onResourceItemClick.bind(this);

    this.storage = storage;
    this.eventBus = eventBus;

    this.buildProgressPin = new Pin({name: "buildProgress", eventBus});


    this.iconPin = new Pin({name: "icon", eventBus});
    this.iconPin.position.y = 2;
    this.setStateController("construction", BaseConstruction);
    this.setStateController("produce", Produce);
    this.setStateController("idle", Idle);
  }

  set hiddenPins(hiddenPins) {
    this._hiddenPins = hiddenPins;

    this.iconPin.visible = this.buildProgressPin.visible = !hiddenPins;
  }

  get hiddenPins() {
    return this._hiddenPins;
  }

  set cell(cell) {
    this._cell = cell;

    if (cell)
      this.onAddedPins();
    else {
      const {buildProgressPin, iconPin} = this;

      iconPin.onRemove();
      buildProgressPin.onRemove();
    }
  }

  get cell() {
    return this._cell;
  }

  get iconName() {
    return this.stateData?.is_broken ? "repair" : this.type;
  }

  addPins() {
    const {buildProgressPin, iconPin, view} = this;

    view.add(iconPin);
    view.add(buildProgressPin);
  }

  onAddedPins() {
    const {buildProgressPin, iconPin} = this;
    buildProgressPin.onAdded();
    iconPin.onAdded();
  }

  initItem() {
    const {resourceItem, backgroundResource} = this;
    if (!resourceItem) return;
    const {storage: {interactionManager, hoverManager}} = this;

    if (backgroundResource.cursor === "pointer") return;

    backgroundResource.cursor = "pointer";

    interactionManager.add(backgroundResource);
    hoverManager.add(backgroundResource);

    backgroundResource.addEventListener("click", this.onResourceItemClick);
  }

  onResourceItemClick(e) {
    e.cancelBubble = true;
    this.eventBus.dispatchEvent({type: "item:click", data: {cell: this.cell}})
  }

  get resourceItem() {
    return this.view.children.find(({name}) => name.includes("_item"));
  }

  get backgroundResource() {
    return this.view.children.find(({name}) => name.includes("_border"));
  }

  setStateController(name, Controller = StateController) {
    this._statesControllers[name] = Controller;
  }

  get settings() {
    return this.storage.settings?.buildings.find(({type}) => type === this.type);
  }

  get improvementLevel() {
    return getImprovementLevel(this.settings, this.stateData);
  }

  updateState(data, force) {
    const state = getState(this.settings, data);

    this.stateData = data;

    if (this._state === state) return false;

    if (state !== "idle" && this.idleFlag) {
      this.idleFlag = false;
    }

    this._state = state;

    this._prevStateProgress = 0;
    this._stateProgress = 0;

    this.stateController?.apply({building: this, force});

    return true;
  }

  updateViewFromChildren() {
    const {improvementLevel} = this;

    this.view.children
      .filter(({name}) => name.includes("_lvl_"))
      .forEach(child => {
        const [, , improvementLevelStr] = child.name.split("_");
        child.visible = Number(improvementLevelStr) === improvementLevel + 1;
      })
  }

  get state() {
    return this._state;
  }

  update(delta) {
    this.stateController?.update({building: this, delta});
  }

  set stateProgress(stateProgress) {
    if (this.stateProgress === stateProgress) return;

    this._prevStateProgress = this.stateProgress;
    this._stateProgress = stateProgress;

    this.onUpdateStateProgress();
  }

  get prevStateProgress() {
    return this._prevStateProgress;
  }

  get stateProgress() {
    return this._stateProgress;
  }

  get stateController() {
    return this._statesControllers[this._state]
  }

  onUpdateStateProgress() {
    if (this.stateProgress === 1)
      this.stateController?.onComplete({building: this});
  }

  init({child}) {

  }

  reset() {
    this._state = null;
  }
}
