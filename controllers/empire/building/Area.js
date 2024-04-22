import {hide, show} from "../animations/area";
import {recursiveDisableAutoUpdateMatrix} from "../../../utils/scene/three/three-utils";
import Pin from "../pin/Pin";

export default class Area extends THREE.Object3D {

  _isOpened = false;

  _areaVisible = true;

  cells = [];

  constructor({object3D, storage, eventBus}) {
    super();

    this.onClick = this.onClick.bind(this);

    this.storage = storage;
    this.eventBus = eventBus;
    this.object3D = object3D;


    object3D.area = this;

    recursiveDisableAutoUpdateMatrix(object3D);

    this.name = `${object3D.name}_area-helper`;

    this.initInteractive();

    this.hide(true);


  }

  get originalName() {
    return this.object3D.name;
  }

  initInteractive() {
    const {eventBus} = this;
    const pin = this.pin = new Pin({name: "area", eventBus, onClick: this.onClick, areaName: this.originalName});

    this.object3D.add(pin);
    pin.onAdded();
  }

  set areaVisible(visible) {
    this.pin.visible = this._areaVisible = visible;
  }

  get areaVisible() {
    return this._areaVisible;
  }

  onClick(e) {
    e?.stopPropagation?.();
    this.eventBus.dispatchEvent({type: "area:click", data: {area: this}});
  }

  set isOpened(isOpened) {
    this._isOpened = isOpened;

    this.cells.forEach(cell => cell.isAreaOpened = isOpened);
  }

  get isOpened() {
    return this._isOpened;
  }

  update(delta) {
    this.cells.forEach(cell => cell.update(delta));
  }

  updateState({cells, force}) {
    this.updateOpen(true, force);

    Object.entries(cells).forEach(([name, data]) => {
      const cell = this.getCellByName(name);
      if (!cell) debugger;
      cell.updateState({...data, force});
    });
    this.cells.forEach((cell) => {
      if (!cells[cell.name])
        cell.destroyBuilding();
    });
  }

  updateOpen(isOpen, force) {
    if (this.isOpened === isOpen) return;

    this.isOpened = isOpen;

    this[isOpen ? "show" : "hide"](force);
  }

  show(force) {
    show(this, force);
  }

  hide(force) {
    hide(this, force)
  }

  getCellByName(name) {
    return this.cells.find(cell => cell.name === name);
  }

  connectCell(cell) {
    if (this.cells.includes(cell)) return;
    this.cells.push(cell);

    cell.isAreaOpened = this.isOpened;
    cell.area = this;
  }
}
