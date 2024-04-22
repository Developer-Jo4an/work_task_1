import BaseLoader from "../BaseLoader";

export default class TextureLoader extends BaseLoader {

  static name = "ThreeTextureLoader"

  load(settings) {
    const {path, fileName} = settings;

    super.load(`${path}${fileName}`);
    new THREE.TextureLoader(this.manager).load(`${path}${fileName}`, (texture) => {
      this.onLoad(settings, texture);
    })
  }
}
