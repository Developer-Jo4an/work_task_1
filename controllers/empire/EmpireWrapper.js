import EmpireData from "./EmpireData";
import ThreeWrapper from "../../utils/scene/wrappers/threejs/ThreeWrapper";
import EmpireController from "./EmpireController";

export default class EmpireWrapper extends ThreeWrapper {

  storage = new EmpireData();

  static get instance() {
    if (!this._instance) this._instance = new EmpireWrapper();

    return this._instance;
  }

  static _instance = null;

  get closedAreas() {
    return (this.controller?.cellsController?.closedAreas ?? []);
  }

  get buildings() {
    return (this.controller?.cellsController?.nonProduceBuildings ?? []);
  }

  get constructionBuildings() {
    return (this.controller?.cellsController?.constructionBuildings ?? []);
  }

  updateWorldState(state, force) {
    this.storage.state = state;
    this.eventBus.dispatchEvent({type: 'empire-wrapper:state-update', data: {force}});
  }

  updateSettings(settings) {
    this.storage.settings = settings;
  }

  initController() {
    const {eventBus, storage} = this;

    return new EmpireController({eventBus, storage});
  }
}
