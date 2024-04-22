import Factory from "../../utils/scene/factory/Factory";
import Empty from "./building/types/Empty";
import {Office} from "./building/types/Office";
import {Field} from "./building/types/Field";
import {BFactory} from "./building/types/BFactory";
import {Store} from "./building/types/Store";
import {Road} from "./building/types/road/Road";
import {deepClone} from "../../utils/scene/three/src/clone";
import AssetsManager from "../../utils/scene/loader/plugins/AssetsManager";

class EmpireFactory extends Factory {

  globalStorage;

  createItem(type, data) {
    const {globalStorage: {model}} = this;
    let item = {};

    switch (type) {
      case "car":
        const cars = model.getObjectByName("cars").children;
        if (
          !AssetsManager.isAssetIsRegistered("carsVariants", "array") ||
          !AssetsManager.getAssetFromLib("carsVariants", "array")?.length
        )
          AssetsManager.addAssetToLib([...cars], "carsVariants", "array");

        const variants = AssetsManager.getAssetFromLib("carsVariants", "array");
        item = deepClone(variants.splice(Math.floor(Math.random() * variants.length))[0]);
        break;
      case "boundingBox":
        item = deepClone(model.getObjectByName("bbox_cell"));
        break;
      case "officeView":
        item = deepClone(model.getObjectByName("office"));
        break;
      case "office":
        item = new Office(data);
        break;
      case "fieldView":
        item = deepClone(model.getObjectByName("farm"));
        break;
      case "field":
        item = new Field(data);
        break;
      case "factoryView":
        item = deepClone(model.getObjectByName("factory"));
        break;
      case "factory":
        item = new BFactory(data);
        break;
      case "storeView":
        item = deepClone(model.getObjectByName("shop"));
        break;
      case "store":
        item = new Store(data);
        break;
      case "road":
        item = new Road(data);
        break;
      case "emptyView":
        item = deepClone(model.getObjectByName("construction"));
        break;
      case "empty":
        item = new Empty(data);
        break;
    }

    this.onCreateItem(type, item, data);

    return item;
  }
}


export default new EmpireFactory();
