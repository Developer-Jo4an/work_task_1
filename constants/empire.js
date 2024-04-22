import {Earthquake} from "../controllers/empire/events/Earthquake";
import Flood from "../controllers/empire/events/Flood";
import Snowstorm from "../controllers/empire/events/Snowstorm";
import Tornado from "../controllers/empire/events/Tornado";

export const baseTypes = ['factory', 'field', 'store'];
export const officeTypes = ['office'];
export const roadTypes = ['road'];

export const resources = {
  money: "money",
  boxes: "boxes",
  tobacco: "tobacco",
};

export const viewEffectDuration = 3_000;

export const FPS = 0.016;

export const eventsPeriod = 10000; // sec

export const breakCount = 3;

export const events = [
  new Earthquake,
  new Flood,
  new Snowstorm,
  new Tornado,
];

export const test = {
  area: {
    width: 10
  }
}

export const states = {
  loadManifest: {availableStates: ["loading"], nextState: "loading"},
  loading: {availableStates: ["loadComplete"]},
  loadComplete: {availableStates: ["initialization"]},
  initialization: {availableStates: ["initializationComplete"], nextState: "initializationComplete"},
  initializationComplete: {availableStates: ["showing"], nextState: "showing"},
  showing: {availableStates: ["showingComplete"]},
  showingComplete: {availableStates: ["playing"]},
  playing: {availableStates: ["lose", "win", "paused"]},
  paused: {availableStates: ["playing"]},
  lose: {availableStates: []},
  win: {availableStates: []},
};


export const ignoreNextStates = [
  "playing",
  "loading",
]
