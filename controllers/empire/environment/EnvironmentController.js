import {recursiveDisableAutoUpdateMatrix} from "../../../utils/scene/three/three-utils";

export default class EnvironmentController {

  constructor({container, storage}) {
    this.storage = storage;
    this.container = container;

    this.initTrees();
    this.initGround();
    this.initLight();
  }

  initLight() {
    const {storage: {mainSceneSettings: {lights}}, container} = this;

    lights.forEach(({type, args, position}) => {
      const light = new THREE[type](...args);
      if (position)
        light.position.set(position.x, position.y, position.z);
      container.add(light)
    })
  }

  initTrees() {
    const {storage: {model}, container} = this;
    const trees = model.getObjectByName("trees")

    const groups = [];
    trees.children.forEach(child => {
      const {geometry, material} = child;
      let group = groups.find(group => group.geometry === geometry && group.material === material);
      if (!group) groups.push(group = {geometry, material, items: []});
      group.items.push(child);
    });


    groups.forEach(({geometry, material, items}) => {
      const mesh = new THREE.InstancedMesh(geometry, material, items.length);
      items.forEach((item, index) => {
        item.updateMatrixWorld(true);
        mesh.setMatrixAt(index, item.matrixWorld);
      })
      container.add(mesh);
    });

    recursiveDisableAutoUpdateMatrix(trees);
  }

  initGround() {
    const {storage: {model}, container} = this;
    const ground = model.getObjectByName("ground");
    ground.material.depthWrite = false;
    ground.material.deptchTest = false;
    ground.renderOrder = -1;
    container.add(ground);
    recursiveDisableAutoUpdateMatrix(ground);
  }
}
