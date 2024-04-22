import BaseBuilding from "../BaseBuilding";
import empireFactory from "../../EmpireFactory";
import {recursiveDisableAutoUpdateMatrix} from "../../../../utils/scene/three/three-utils";

export class BFactory extends BaseBuilding {

  type = "factory"

  constructor(data) {
    super(data);

    this.createView();

    if (this.resourceItem) this.resourceItem.visible = false;
    if (this.backgroundResource) this.backgroundResource.visible = false;
  }

  createView() {
    this.view = empireFactory.getItem("factoryView")
    this.addPins();
    this.initItem();
  }

  updateState(data, force) {
    const result = super.updateState(data, force);
    if (!result) return result;
    this.updateViewFromChildren();
    return result;
  }

  reset() {
    super.reset()
    this.view.parent.remove(this.view);
  }

  init({child}) {
    child.add(this.view);
    recursiveDisableAutoUpdateMatrix(this.view);
  }
}
