import {LoadersManager} from "../LoadersManager";
import JSONLoader from "./JSONLoader";

export class BaseManager extends LoadersManager {

  getLoader({type}) {
    switch (type) {
      case "json":
        return JSONLoader;
    }
  }
}

export const baseManager = new BaseManager();
