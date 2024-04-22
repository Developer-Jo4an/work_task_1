import {del, get, post, put} from "./methods";
import {worldStateManager} from "../controllers/empire/test/WorldStateManager";


const API_URL = "/api/v3/";
const GAME_API_URL = `${API_URL}games/tobacco-empire/`;
const useApi = !process.env.IS_DEV;

export function destroy(data) {
  return process.env.NODE_ENV === "development" && !useApi || process.env.IS_DEV ?
    worldStateManager.upgrade(data) :
    del({
      url: `${GAME_API_URL}building`,
      data
    })
}

export function upgrade(data) {
  return process.env.NODE_ENV === "development" && !useApi || process.env.IS_DEV ?
    worldStateManager.upgrade(data) :
    put({
      url: `${GAME_API_URL}building`,
      data
    })
}

export function exchange(data) {
  return process.env.NODE_ENV === "development" && !useApi || process.env.IS_DEV ?
    null :
    post({
      url: `${GAME_API_URL}exchanger`,
      data
    })
}

export function open(area) {
  return process.env.NODE_ENV === "development" && !useApi || process.env.IS_DEV ?
    null :
    post({
      url: `${GAME_API_URL}buy-new-area/${area}`
    })
}

export function collect(data) {
  return process.env.NODE_ENV === "development" && !useApi || process.env.IS_DEV ?
    null :
    post({
      url: `${GAME_API_URL}collect-resources`,
      data
    })
}

export function tasks() {
  return process.env.NODE_ENV === "development" && !useApi || process.env.IS_DEV ?
    null :
    get({
      url: `${GAME_API_URL}task-list`
    })
}

export function updateWorldState(data) {
  return process.env.NODE_ENV === "development" && !useApi || process.env.IS_DEV ?
    worldStateManager.updateState(data) :
    null
}


export function brokeBuildings(broken_buildings) {
  return process.env.NODE_ENV === "development" && !useApi || process.env.IS_DEV ?
    null :
    post({
      url: `${GAME_API_URL}broke-buildings`,
      data: broken_buildings
    })
}

export function completeTutorial() {
  return process.env.NODE_ENV === "development" && !useApi || process.env.IS_DEV ?
    null :
    put({
      url: `${GAME_API_URL}settings`,
      data: {
        passed_tutorial: true
      }
    })
}


export function repair(data) {
  return process.env.NODE_ENV === "development" && !useApi || process.env.IS_DEV ?
    null :
    post({
      url: `${GAME_API_URL}reapair-building`,
      data
    })
}

export function produce(data) {
  return process.env.NODE_ENV === "development" && !useApi || process.env.IS_DEV ?
    null :
    post({
      url: `${GAME_API_URL}produce-resources`,
      data
    })
}

export function getWorldState() {
  return process.env.NODE_ENV === "development" && !useApi || process.env.IS_DEV ?
    worldStateManager.getState() :
    get({
      url: `${GAME_API_URL}level`,
    })
}
