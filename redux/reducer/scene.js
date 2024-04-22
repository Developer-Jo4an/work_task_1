import Builder from '../../utils/redux/builder';
import {states} from '../../constants/empire';
import {
  authorization, brokeBuildings,
  build,
  collect, completeTutorial, destroy, exchange,
  getSettings,
  getWorldState,
  open, produce, repair, tasks,
  updateWorldState,
  upgrade
} from '../../api/empire';
import {importControllerJS} from '../../utils/scene/utils/helpers/import';
import {getBuildingSettings} from '../../utils/empire/data';
import tutorialController from '../../controllers/empire/tutorial/TutorialController';
import {soundManager} from '../../utils/scene/sound/SoundManager';
import {empireController} from '../../api_v2/EmpireController';
import {worldStateManager} from '../../controllers/empire/test/WorldStateManager';

let instance;


let isTutorialShown;

try {
  isTutorialShown = localStorage.getItem('empireTutorial');
} catch (e) {

}

const builder = new Builder({
  name: 'scene',
  initialState: {
    state: 'loadManifest',
    settings: null,
    worldState: null,
    tasks: [],
    isTutorialShown: !!isTutorialShown,
    loadingProgress: 0,
    previousStates: []
  },
  reducers: {
    onShowTutorial(state) {
      state.isTutorialShown = true;
      try {
        localStorage.setItem('empireTutorial', 'true');
      } catch (e) {
      }
      tutorialController.check(state.worldState);
    },
    onReady(state) {
      state.ready = true;
    },
    onLoadingProgress(state, {payload: progress}) {
      state.loadingProgress = progress;
    },
    requestPreviousState(state) {
      if (state.previousStates.length)
        state.state = state.previousStates.splice(-1, 1)[0];
    },
    requestState(state, action) {
      let nextState = action.payload;

      if (!states[state.state].availableStates || states[state.state].availableStates.indexOf(nextState) !== -1) {
        state.previousStates.push(state.state);
        state.state = nextState;
      }
    },
  }
});

builder
.createSelector('building', (state, type) => {
  return {
    settings: getBuildingSettings(state.scene.settings, type),
    worldState: state.scene.worldState
  };
})
.createExtraReducer({
  thunkName: 'load',
  saveData(state, {payload: {areas, buildings, exchanger, account}}) {

    updateState(account, state);

    state.settings = {
      areas,
      buildings: partsBuildings(buildings)
    };

    state.exchanger = exchanger;

    instance.updateSettings(state.settings);
    instance.updateWorldState(state.worldState, true);

    state.ready = true;
    state.state = 'loadComplete';
  },
  func: async function () {
    instance = (await importControllerJS()).default.instance;

    empireController.setGameData();

    const data = empireController.getGameData();

    await instance.loadingPromise;

    return data;
  }
})
.createExtraReducer({
  thunkName: 'build',
  saveData(state, {payload}) {
    updateState(payload, state);
    instance.updateWorldState(payload, true);
  },
  func: async function ({area, cell, type}) {
    const data = await empireController.build({area, cell, building_type: type});
    console.log(data);
    global.window?.soundManager?.onPlay('building',);
    return data;
  }
})
.createExtraReducer({
  thunkName: 'upgrade',
  func: async function (data, state) {

    const improvement_id = state.worldState.world_state[data.area][data.cell].improvement.next_improvement;
    global.window?.soundManager?.onPlay('upgrade',);

    const data = await empireController.build({area, cell, building_type: type});

    const {data: result} = await upgrade({...data, improvement_id});
    return result;
  }
})
.createExtraReducer({
  thunkName: 'exchange',
  func: async function ({id, quantity}) {
    const {data} = await exchange({id, receive_quantity: quantity});
    return {account: data};
  }
})
.createExtraReducer({
  thunkName: 'tasks',
  saveData(state, {payload}) {
    state.tasks = payload.results;
  },
  func: async function () {
    const {data} = await tasks();
    return data;
  }
})
.createExtraReducer({
  thunkName: 'open',
  func: async function ({area}) {
    const {data} = await open(area);
    return {account: data};
  }
})
.createExtraReducer({
  thunkName: 'collect',
  func: async function ({cell, area}) {
    const {data} = await collect({area, cell});

    return data;
  }
})
.createExtraReducer({
  thunkName: 'destroy',
  func: async function (data) {
    const {data: result} = await destroy(data);
    global.window?.soundManager?.onPlay('destroy',);
    return result;
  }
})
.createExtraReducer({
  thunkName: 'update',
  func: async function () {
    const {data} = await getSettings();
    return data;
  }
})
.createExtraReducer({
  thunkName: 'broke',
  func: async function ({cells, type}) {

    cells.forEach(data => data.reason = type);

    const {data} = await brokeBuildings(cells);

    return {account: data};
  }
})
.createExtraReducer({
  thunkName: 'repair',
  func: async function (params) {
    const {data} = await repair(params);
    global.window?.soundManager?.onPlay('repair',);
    return data;
  }
})
.createExtraReducer({
  thunkName: 'completeTutorial',
  saveData(state) {
    state.worldState.passed_tutorial = true;
  },
  func: async function (params, state) {
    if (state.worldState.passed_tutorial) return;
    const {data} = await completeTutorial();

    return data;
  }
})
.createExtraReducer({
  thunkName: 'produce',
  func: async function ({cellId, area}) {
    const {data} = await produce({area, cell: cellId});

    return data;
  }
})
.addMatcher(({payload}) => !!payload?.account, (state, {payload: {account}}) => {
  updateState(account, state);
  instance.updateWorldState(state.worldState);
});

function updateState(account, state) {
  const data = {
    ...account,
    world_state: account.world_state
  };
  state.worldState = data;
  tutorialController.check(data);
}

function partsBuildings(buildings) {
  buildings.forEach(building => {
    let improvement = building.improvements.find(({is_start_improvement}) => is_start_improvement);
    const improvements = [improvement];

    while (improvement.next_improvement) {
      improvement = building.improvements.find(({id}) => id === improvement.next_improvement);
      improvements.push(improvement);
    }

    building.improvements = improvements;
  });

  return buildings;
}

builder.create();
const scene = builder.export();
export default scene;

export const {requestState, onReady} = scene.actions;
export const {load} = scene.thunks;
export const {useScene, useBuilding} = scene.selectors;

export function getNextState(currentState) {
  let nextState = states[currentState]?.availableStates[0];
  if (!nextState) {
    const keys = Object.keys(states);
    nextState = keys[Math.min(keys.indexOf(currentState) + 1, keys.length - 1)];
  }
  return nextState;
}

