import BaseBuilding from "../BaseBuilding";
import {recursiveDisableAutoUpdateMatrix} from "../../../../utils/scene/three/three-utils";
import empireFactory from "../../EmpireFactory";

export default class Empty extends BaseBuilding {

  type = "empty"

  constructor(data) {
    super(data);

    this.createView();
  }

  createView() {
    this.view = empireFactory.getItem("emptyView")
    this.addPins();

  }

  updateState(data, force) {
    return super.updateState(data, force);
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
