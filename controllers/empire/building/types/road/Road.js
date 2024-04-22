import BaseBuilding from "../../BaseBuilding";
import {recursiveDisableAutoUpdateMatrix} from "../../../../../utils/scene/three/three-utils";

export class Road extends BaseBuilding {

  type = "road";

  constructor(data) {
    super(data);

    this.createView();
  }

  updateState(data, force) {
    const result = super.updateState(data, force);
    const {improvementLevel} = this;

    this.view = this.cell.object3D.children.filter((child, index) => {
      if (!child.name.includes("lvl")) return;
      return child.visible = index === improvementLevel;
    })[0];

    const container = this.view.parent.children.find(({name}) => name.includes("_pin"));

    if (container) {
      container.add(this.cell.bbox);
      container.add(this.buildProgressPin);
      container.add(this.iconPin);

      this.buildProgressPin.position.y = this.iconPin.position.y = 0;
    }

    recursiveDisableAutoUpdateMatrix(this.cell.object3D);

    return result;
  }

  createView() {
    this.view = new THREE.Object3D;
    this.addPins();

  }

  init({child}) {

  }
}
