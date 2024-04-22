import BaseLoader from "../BaseLoader";
import {soundManager} from "../../../sound/SoundManager";

export default class SoundLoader extends BaseLoader {

  static name = "HowlerSoundLoader"

  load(settings) {
    const {path, fileName, name} = settings;

    super.load(`${path}${fileName}`);

    const resultPath = this.manager.resolveURL(`${path}${fileName}`);

    soundManager.load({name, path: resultPath});
    soundManager.items[name].promise.then(() => this.onLoad(settings, soundManager.items[name]));
  }
}
