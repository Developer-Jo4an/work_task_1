import BaseLoader from "../BaseLoader";

export default class TextureLoader extends BaseLoader {

  static name = "PixiTextureLoader";

  load(settings) {
    const {path, fileName} = settings;
    const loader = new PIXI.Loader();
    const url = this.manager.resolveURL(`${path}${fileName}`);
    super.load(url)

    loader.add(settings.name, url)
    loader.load((loader, resources) => this.onLoad(settings, resources[settings.name].texture));
  }
}
