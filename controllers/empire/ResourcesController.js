import {resources} from "../../constants/empire";
import {getResourceProperty} from "../../utils/empire/data";

export default class ResourcesController {

  resources = {};

  constructor({eventBus, storage}) {

    this.onCheckEnough = this.onCheckEnough.bind(this);

    this.storage = storage;
    this.eventBus = eventBus;


    eventBus.addEventListener("check-enough", this.onCheckEnough);
  }

  onCheckEnough(e) {
    const {data: {buildType, improvementLevel}} = e;

    e.data.isEnough = this.getImprovementSettings(buildType, improvementLevel);
  }

  getImprovementSettings(type, level) {
    const {cost} = this.storage.settings.buildings
      .find(building => building.type === type)
      .improvements[level]
    return this.resources.money >= cost
  }

  updateResources() {
    const {storage: {state}} = this;

    Object.keys(resources).forEach(key => this.resources[key] = state[getResourceProperty(key)]);
  }

  update({buildings}) {
    this.checkIdleBuildings(buildings);
  }

  checkIdleBuildings(buildings) {
    const {eventBus} = this;

    const idleBuildings = buildings
      .filter(({state, settings, improvementLevel, idleFlag}) =>
        state === "idle" &&
        !idleFlag &&
        settings.improvements[improvementLevel].production_quantity
      )
      .sort((a, b) =>
        b.settings.improvements[b.improvementLevel].production_quantity - a.settings.improvements[a.improvementLevel].production_quantity
      );
    const cloneResources = {...this.resources};

    idleBuildings.forEach(building => {
      const {settings, improvementLevel} = building;
      const {production_cost_type, production_cost} = settings.improvements[improvementLevel];

      if (!production_cost_type || cloneResources[production_cost_type] >= production_cost) {
        cloneResources[production_cost_type] -= production_cost;

        building.idleFlag = true;

        eventBus.dispatchEvent({
          type: "cell:update-state",
          data: {cell: building.cell, state: "produce"}
        });
      }
    });
  }
}
