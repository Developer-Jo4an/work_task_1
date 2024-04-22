import {settings, state} from "../../../constants/mock";

class WorldStateManager {

  constructor() {
    this.settings = JSON.parse(JSON.stringify(settings));
    this.worldState = JSON.parse(JSON.stringify(state));
  }

  getState() {
    return this.wrapData(this.worldState);
  }

  getSettings() {
    return this.wrapData(this.settings);
  }

  build(data) {
    const {worldState, worldState: {resources}} = this;
    const {cellId, buildType} = data;
    const {areaIndex} = this.getDataByCellId(cellId);

    let area = worldState.areas.find(({name}) => name === `area_${areaIndex}`);

    if (!area)
      area = this.openArea(`area_${areaIndex}`)

    const building = this.getEmptyBuilding(buildType, cellId);

    const settings = this.settings.buildings.find(cBuilding => cBuilding.type === building.type);

    const {
      cost
    } = settings.improvements[building.improvementLevel];

    if (this.checkEnoughResources({
      money: cost
    })) {
      area.buildings.push(building);
      resources.money -= cost;
    }

    return this.wrapData(worldState);
  }

  upgrade(data) {
    const {worldState} = this;

    const {cellId} = data;

    const {areaIndex} = this.getDataByCellId(cellId);

    const area = worldState.areas.find(({name}) => name === `area_${areaIndex}`);

    const building = area.buildings.find(building => building.cellId === cellId);

    const settings = this.settings.buildings.find(cBuilding => cBuilding.type === building.type);

    if (building.improvementLevel + 1 < settings.improvements.length) {
      building.improvementLevel++;

      worldState.resources.money -= settings.improvements[building.improvementLevel].cost;

      building.state = "construction";

      building.stateChangeTime = this.getTimestamp();
      building.collectionTime = this.getTimestamp();
    }

    return this.wrapData(worldState);
  }

  openArea(areaID) {
    const area = this.getEmptyArea(areaID);
    this.worldState.areas.push(area)

    return area
  }

  open({areaID}) {
    const {worldState} = this;

    this.openArea(areaID);

    return this.wrapData(worldState);
  }

  collect(data) {
    const {worldState} = this;
    const {cellId} = data;

    const {areaIndex} = this.getDataByCellId(cellId);

    const area = worldState.areas.find(({name}) => name === `area_${areaIndex}`);

    const building = area.buildings.find(building => building.cellId === cellId);
    const settings = this.settings.buildings.find(cBuilding => cBuilding.type === building.type);

    const {
      productionType,
      productionQuantity
    } = settings.improvements[building.improvementLevel];

    if (building.state === "produce") {
      building.collectionTime = this.getTimestamp();
      building.state = "idle";
      worldState.resources[productionType] += productionQuantity;
    }


    return this.wrapData(worldState);
  }

  checkEnoughResources(need) {
    const {worldState} = this;
    return !Object.entries(need).some(([resource, value]) => worldState.resources[resource] < value);
  }

  updateState(data) {
    const {worldState, worldState: {resources}} = this;
    const {cellId, state} = data;
    const {areaIndex} = this.getDataByCellId(cellId);

    const area = worldState.areas.find(({name}) => name === `area_${areaIndex}`);

    const building = area.buildings.find(building => building.cellId === cellId);

    const settings = this.settings.buildings.find(cBuilding => cBuilding.type === building.type);
    const {productionCostType, productionCost} = settings.improvements[building.improvementLevel];


    if (state === "produce" && this.checkEnoughResources({
      [productionCostType ?? "money"]: productionCost ?? 0
    })) {
      building.collectionTime = this.getTimestamp();
      resources[productionCostType] -= productionCost;
    }


    building.state = state;
    building.stateChangeTime = this.getTimestamp();

    return this.wrapData(worldState);
  }

  getDataByCellId(cellId) {
    const [, areaIndex, cellID] = cellId.split("_");

    return {
      areaIndex,
      cellID
    }
  }

  wrapData(data) {
    return Promise.resolve({
      data: JSON.parse(JSON.stringify(data))
    })
  }

  getTimestamp() {
    return Math.floor(Date.now() / 1000);
  }

  getEmptyBuilding(name, cellId) {

    return {
      type: name,
      cellId: cellId,
      state: "construction",
      connectedCell: name === "office" ? `${cellId}_office` : cellId.replace("_office", ""),
      stateChangeTime: this.getTimestamp(),
      collectionTime: this.getTimestamp(),
      improvementLevel: 0
    }
  }

  getEmptyArea(areaID) {
    return {
      name: areaID,
      buildings: []
    }
  }
}

export const worldStateManager = new WorldStateManager;
