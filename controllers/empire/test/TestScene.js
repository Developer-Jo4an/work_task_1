import {test} from "../../../constants/empire";

export default class TestScene extends THREE.Object3D {

  constructor() {
    super();

    let i = 3;
    while (i--) {
      const cells = {}
      for (let j = 0; j < 6; j++)
        cells[`cell_${j}`] = {};
      this.initArea(`area_${i + 1}`, cells, i, 3);
    }
  }

  initArea(name, value, index, count) {

    const cells = Object.entries(value);

    const {area: {width}} = test;
    const angle = Math.PI / cells.length;

    const rows = Math.floor(Math.sqrt(count));

    const baseX = index % rows * width;
    const baseZ = Math.floor(index / rows) * width;

    const area = new THREE.Object3D;
    area.name = name;
    this.add(area);

    const start = this.getTestItem();
    start.name = `bounds_${name}_start`;
    start.position.set(baseX, 0, baseZ);

    area.add(start);

    const end = this.getTestItem();
    end.name = `bounds_${name}_end`;
    end.position.set(baseX + width, 0, baseZ + width);
    area.add(end);

    cells.forEach(([name, data], index) => {
      const cell = this.getCell();

      const r = index % 2 ? width / 6 : width / 4;
      let x = baseX + width / 2 + r * Math.cos(angle * index * 2);
      let y = 0;
      let z = baseZ + width / 2 + r * Math.sin(angle * index * 2);
      cell.name = name;
      cell.position.set(
        x,
        y,
        z
      );
      area.add(cell);
    });
  }

  getTestItem() {
    const container = new THREE.Object3D;

    container.add(new THREE.AxesHelper(3));

    return container;
  }

  getCell() {
    const container = new THREE.Object3D;

    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.2, 1),
      new THREE.MeshBasicMaterial({
        color: 0xff0000
      })
    );
    box.position.y = 0.1;
    box.name = "bbox_cell";
    container.add(box);

    return container;
  }
}
