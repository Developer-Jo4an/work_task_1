export default class StateController {

  static update({building, delta}) {

  }

  static apply({building}) {
    this.clearAnimation(building);
  }

  static clearAnimation(building) {
    building._clearAnimation?.();
  }

  static onComplete({building}) {

  }

  static getBuildingSettings(building) {
    const {
      stateData: {type},
      storage: {settings: {buildings}}
    } = building;

    return buildings.find(data => data.type === type);
  }
}
