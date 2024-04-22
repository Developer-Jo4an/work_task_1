import store from "../../redux/store";
import {resources} from "../../constants/empire";

export function getImprovementLevel(buildingSettings, buildingData) {
  const {improvement: {id}} = buildingData;
  return buildingSettings.improvements.findIndex(({id: improvementID}) => improvementID === id);
}

export function getResourceProperty(name) {
  return `${name}_amount`;
}

export function getBuildingData(cell, area) {
  const empire = store.getState().scene
  const data = empire.worldState.world_state;
  const cellData = data[area][cell];
  const settings = getBuildingSettings(empire.settings, cellData.type)
  const improvementLevel = getImprovementLevel(settings, cellData);
  const currentMoney = empire.worldState[getResourceProperty(resources.money)]
  const state = getState(settings, data);

  const hasUpdate = improvementLevel + 1 < settings?.improvements.length;

  const disabledUpgrade = state !== "produce" && state !== "idle" ||
    improvementLevel + 1 >= settings?.improvements.length ||
    settings.improvements[improvementLevel + 1].cost > currentMoney

  const disabledRepair = settings.improvements[improvementLevel].repair_cost > currentMoney;

  const disabledDestroy = settings.improvements[improvementLevel].destroy_cost > currentMoney;

  return {
    improvementLevel,
    disabledRepair,
    hasUpdate,
    disabledUpgrade,
    disabledDestroy,
    nextImprovement: hasUpdate && settings.improvements[improvementLevel + 1], ...cellData
  };
}

export function isEnough(type, level) {
  const empire = store.getState().scene
  const {cost} = empire.settings.buildings
    .find(building => building.type === type)
    .improvements[level] ?? {};
  return empire.worldState.money_amount >= cost;
}

export function getState(buildingSettings, buildingData) {  //“construction” | “broken” | “produce” | “idle”

  const {is_broken, start_upgrading, produce_start, last_time_collected} = buildingData;

  if (is_broken) return "broken";

  if (start_upgrading && (start_upgrading + (buildingData.improvement.construction_time ?? 0) > getTimestamp()))
    return "construction"

  if (produce_start && (produce_start >= last_time_collected || !last_time_collected))
    return "produce"

  return "idle";
}

export function getBuildingSettings(settings, type) {
  return settings?.buildings?.find(building => building.type === type)
}

export function getTimestamp() {
  return Math.floor(Date.now() / 1000);
}
