import BaseLoader from "../BaseLoader";
import {loadJSON} from "../../../utils/load-json";

export default class JSONLoader extends BaseLoader {


  load(settings) {
    const {url} = settings;
    super.load(url);

    return loadJSON(url).then(
      (data) => this.onLoad(settings, data),
      (error) => this.onError(error),
    )
  }
}
