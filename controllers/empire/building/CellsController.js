import Area from "./Area";
import Cell from "./Cell";
import PerformanceStats from "../../../utils/scene/three/performance/Stats";

export default class CellsController {

  areas = {};

  requests = [];

  constructor({storage, eventBus}) {
    this.storage = storage;
    this.eventBus = eventBus;

    eventBus.addEventListener("request-buildings", this.onRequestBuildings.bind(this));
    eventBus.addEventListener("request-break-buildings", this.onRequestBreak.bind(this));
    eventBus.addEventListener("get-areas", this.onGetAreas.bind(this));
  }

  onGetAreas({data}) {
    data.result = this.areas;
  }

  get baseBuildings() {
    const buildings = [];

    Object
      .values(this.areas)
      .forEach(({cells}) =>
        cells
          .forEach(({building}) => {
            if (building)
              buildings.push(building);
          }))
    return buildings;
  }


  get visibleBuildings() {
    const buildings = [];

    Object
      .values(this.areas)
      .forEach(({cells}) =>
        cells
          .forEach(({building}) => {
            if (building && building?.cell?.isAreaOpened)
              buildings.push(building);
          }));
    return buildings;
  }

  get closedAreas() {
    return Object
      .values(this.areas).filter(({isOpened}) => !isOpened);
  }

  get resourceBuildings() {
    return this.baseBuildings.filter(({type}) => type !== "empty" && type !== "road");
  }

  get nonProduceBuildings() {
    return this.visibleBuildings.filter(({state, stateProgress}) => (state !== "produce" || stateProgress !== 1));
  }

  get constructionBuildings() {
    return this.visibleBuildings.filter(({state}) => state === "construction");
  }

  checkRequests() {
    let i = this.requests.length;

    while (i--) {
      const request = this.requests[i];

      if (this.checkRequest(request)) {
        this.requests.splice(i, 1);
        request.resolve();
      }
    }
  }

  checkRequest(request) {
    const {action} = request;

    return this[`${action}Request`]?.(request);
  }

  breakRequest(request) {
    const {buildings} = request;

    return !buildings.some(({stateData: {is_broken}}) => !is_broken);
  }

  onRequestBreak({data: request}) {
    this.requests = this.requests.filter(cRequest => {
      const isSame = cRequest.signature === request.signature;
      cRequest.reject();

      return !isSame;
    })
    this.requests.push({...request, action: "break"});
  }

  onRequestBuildings(event) {
    const {data: {type, ignoreBroken, ignoreConstruction}} = event;
    event.data.result =
      this.buildings.filter(({type: bType, stateData: {is_broken}, state}) =>
        bType === type &&
        (ignoreBroken ? !is_broken : true) &&
        (ignoreConstruction ? state !== "construction" : true)
      );
  }

  get buildings() {
    return Object.values(this.areas).reduce((array, area) => {
      area.cells.forEach(({building}) => building && building.stateData && array.push(building));
      return array;
    }, []);
  }

  update(delta) {
    Object.values(this.areas).forEach(area => area.update(delta));
  }

  updateAreas(data, force) {
    Object.entries(data).forEach(([name, cells]) => {
      const area = this.getAreaByName(name);
      area.updateState({cells, force});
    });
    this.checkRequests();
  }

  getAreaByName(name) {
    return this.areas[name];
  }

  createArea(child) {
    const {storage: {scene}, storage, eventBus} = this;

    const area = this.areas[child.name] = new Area({
      object3D: child,
      eventBus,
      storage
    })
    scene.add(area);
  }

  addCell(child, isOffice) {
    const {storage, eventBus} = this;

    const area = Object.values(this.areas).find(({object3D}) => object3D.getObjectById(child.id))

    const cell = new Cell({
      object3D: child,
      storage,
      isOffice,
      eventBus
    });
    area.connectCell(cell);
  }
}
