import {produce} from "../../../api/empire";

export default class EmpireReduxBridge {

  constructor({dispatch, builderResult, wrapper}) {

    this.onCellClick = this.onCellClick.bind(this);
    this.onAreaClick = this.onAreaClick.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.onCellUpdateState = this.onCellUpdateState.bind(this);
    this.onConstructionComplete = this.onConstructionComplete.bind(this);
    this.onRequestBreakBuildings = this.onRequestBreakBuildings.bind(this);

    this.builderResult = builderResult;
    this.dispatch = dispatch;
    this.wrapper = wrapper;

    wrapper.eventBus.addEventListener("construction:complete", this.onConstructionComplete);
    wrapper.eventBus.addEventListener("cell:update-state", this.onCellUpdateState);
    wrapper.eventBus.addEventListener("cell:click", this.onCellClick);
    wrapper.eventBus.addEventListener("area:click", this.onAreaClick);
    wrapper.eventBus.addEventListener("item:click", this.onItemClick);
    wrapper.eventBus.addEventListener("request-break-buildings", this.onRequestBreakBuildings);
  }


  onRequestBreakBuildings({data: {buildings, type}}) {
    const {builderResult, dispatch} = this;
    const data = buildings.map(building => ({
      area: building.cell.area.originalName,
      cell: building.cell.name,
    }));

    dispatch(builderResult.thunks.broke({cells: data, type}));
  }

  onCellUpdateState({data: {cell, state}}) {
    this.produce({cellId: cell.name, area: cell.area.originalName, state});
  }

  onAreaClick({data: {area}}) {
    if (!area.isOpened) this.openArea({area: area.originalName});
  }

  openArea(data) {
    const {builderResult, dispatch} = this;
    dispatch(builderResult.thunks.open(data));
  }

  onCellClick({data: {cell}}) {
    const {building} = cell;

    if (building.stateData) {
      const {state} = building;
      this[`${state}Click`]?.(cell);
    } else {
      this.onEmptyClick(cell);
    }
  }

  onEmptyClick(cell) {
    const {wrapper: {eventBus}} = this;
    const {name, area: {originalName: area}} = cell;
    const isOffice = !(Number(name.split("_")[1]) % 2);
    eventBus.dispatchEvent({
      type: "request-build",
      data: {storeType: isOffice ? "office" : "base", cell: name, area}
    });
  }

  build(data) {
    const {builderResult, dispatch} = this;
    dispatch(builderResult.thunks.build(data));
  }

  requestInfo(cell) {
    const {wrapper: {eventBus}} = this;
    const {name, area: {originalName: area}} = cell;
    const isOffice = !(Number(name.split("_")[1]) % 2);
    eventBus.dispatchEvent({
      type: "request-info",
      data: {isOffice, cell: name, area}
    });
  }

  brokenClick(cell) {
    this.requestInfo(cell);
  }

  idleClick(cell) {
    this.requestInfo(cell);
  }

  produceClick(cell) {
    this.requestInfo(cell);
  }

  onItemClick({data: {cell}}) {
    if (cell.building?.stateProgress !== 1) return;
    this.collect({cell: cell.name, area: cell.area.originalName});
  }

  onConstructionComplete({data: {cell}}) {
    this.update({cellId: cell.name, area: cell.area.originalName});
  }

  collect(data) {
    const {builderResult, dispatch} = this;
    dispatch(builderResult.thunks.collect(data));
  }

  update(data) {
    const {builderResult, dispatch} = this;
    dispatch(builderResult.thunks.update(data));
  }

  produce(data) {
    const {builderResult, dispatch} = this;
    dispatch(builderResult.thunks.produce(data));
  }
}
