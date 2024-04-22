import empireFactory from "../EmpireFactory";

export default class Cell {

  _isAreaOpened = false;

  _building = null;

  _hiddenPins = false;

  _interactiveBbox = true;

  constructor({
                object3D,
                isOffice,
                storage,
                eventBus,
                index
              }) {
    this.onClick = this.onClick.bind(this);

    this.index = index;
    this.object3D = object3D;
    this.isOffice = isOffice;
    this.storage = storage;
    this.eventBus = eventBus;

    this.initInteractive();

    this.updateBuildingType("empty");
  }

  set interactiveBbox(interactive) {
    if (this.interactiveBbox === interactive) return;

    this.bbox.cursor = interactive ? "pointer" : "";

    this._interactiveBbox = interactive;
  }

  get interactiveBbox() {
    return this._interactiveBbox;
  }

  set isAreaOpened(isAreaOpened) {
    this._isAreaOpened = isAreaOpened;


    const {storage: {interactionManager, hoverManager}, bbox} = this;
    interactionManager[isAreaOpened ? "add" : "remove"](bbox);
    hoverManager[isAreaOpened ? "add" : "remove"](bbox);
  }

  get isAreaOpened() {
    return this._isAreaOpened;
  }

  initInteractive() {
    const {object3D} = this;

    const bbox = this.bbox = empireFactory.getItem("boundingBox")

    object3D.add(bbox);

    bbox.visible = false;
    bbox.cursor = "pointer";

    bbox.addEventListener("click", this.onClick);
    this.bbox = bbox;
  }

  get building() {
    return this._building;
  }

  onClick(e) {
    if (!this.interactiveBbox) return;
    e.stopPropagation();
    this.eventBus.dispatchEvent({type: "cell:click", data: {cell: this}});
  }

  get name() {
    return this.object3D.name;
  }

  update(delta) {
    this._building?.update(delta);
  }

  destroyBuilding() {
    this.updateBuildingType("empty");
  }

  updateState(state) {
    const {force, type} = state;

    this.updateBuildingType(type);

    this._building.updateState(state, force);
  }

  updateBuildingType(type) {
    if (this._building?.type === type) return;

    const {object3D, storage, eventBus} = this;

    if (this._building) empireFactory.pushItem(this._building);

    const building = this._building = empireFactory.getItem(type, {storage, eventBus});
    building.init({child: object3D});
    building.cell = this;
  }
}
