import BaseBuilding from "../BaseBuilding";
import empireFactory from "../../EmpireFactory";
import {recursiveDisableAutoUpdateMatrix} from "../../../../utils/scene/three/three-utils";

export class Office extends BaseBuilding {

  type = "office"

  constructor(data) {
    super(data);

    this.createView();
    if (this.resourceItem) this.resourceItem.visible = false;
    if (this.backgroundResource) this.backgroundResource.visible = false;
  }

  createView() {
    this.view = empireFactory.getItem("officeView");
    this.addPins();
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
