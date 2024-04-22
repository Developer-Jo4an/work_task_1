import Manager from "../managers/Manager";

export default class BaseLoader {

  manager;

  constructor(manager, data) {
    this.manager = manager || new Manager();
    this.data = data;
  }


  load(url) {
    this.manager.itemStart(url, "custom-loader");
  }

  onLoad(settings, resource) {
    this.manager.itemEnd(settings, resource, this);
  }

  onError(data) {
    this.manager.itemError(data);
  }
}
