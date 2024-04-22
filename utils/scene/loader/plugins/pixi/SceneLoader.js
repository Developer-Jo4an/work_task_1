import BaseLoader from "../BaseLoader";

export default class SceneLoader extends BaseLoader {

  static name = "PixiSceneLoader";

  load(settings) {
    const {path, sceneName} = settings;
    const pathName = `${path}${sceneName}`

    super.load(pathName);

    this.loadScript(settings)
      .then(() => this.loadScene(settings))
      .then(data => this.onLoad(settings, data))
  }

  loadScene({path}) {
    const animationData = global.module.exports;
    const loader = new PIXI.Loader();
    loader.baseUrl = this.manager.resolveURL(path);

    return new Promise(resolve => {
      PIXI.animate.load(animationData, {
        loader,
        complete() {
          animationData.setup(PIXI.animate);
          resolve(animationData);
        }
      });
    })
  }

  loadScript({path, sceneName}) {
    const scriptPath = this.manager.resolveURL(`${path}${sceneName}.js`)

    global.module = global.module ?? {};

    return new Promise(resolve => {
      const script = document.createElement('script');
      script.onload = resolve;
      script.src = scriptPath;
      document.head.appendChild(script);
    });
  }
}
