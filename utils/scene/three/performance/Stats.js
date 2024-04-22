export default class PerformanceStats {

  static data = {
    autoUpdatableItems: 0
  };

  static update({scene, renderer}) {
    const {data} = this;
    data.autoUpdatableItems = []
    data.totalItems = 0;

    scene.traverse(child => {
      data.totalItems++;
      if (child.matrixAutoUpdate) data.autoUpdatableItems.push(child);
    });

    data.info = renderer.info;

    global.window._threePerfomance = data;
  }
}
