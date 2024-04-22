export default class Cell {

  connectedCells = []

  asNext = [];

  asCurrent = [];

  constructor({object3D}) {
    this.object3D = object3D;


    object3D.isRoadCell = true;
    object3D.updateWorldMatrix(true, true);

    this.position = (new THREE.Vector3()).setFromMatrixPosition(object3D.matrixWorld);
  }

  get isOpened() {
    const {object3D} = this;
    let isOpened = false;
    let item = object3D;
    while (item.parent && !isOpened) {
      item = item.parent;
      if (item?.area?.isOpened) isOpened = true;
    }

    return isOpened;
  }

  checkAndRemoveItem(arr, item) {
    if (arr.includes(item))
      arr.splice(arr.indexOf(item), 1);
  }

  onAsNext(item) {
    this.onRemoveItem(item);
    this.asNext.push(item);

  }

  onAsCurrent(item) {
    this.onRemoveItem(item);
    this.asCurrent.push(item);
  }

  onRemoveItem(item) {
    this.checkAndRemoveItem(this.asCurrent, item);
    this.checkAndRemoveItem(this.asNext, item);
  }

  connect(...cells) {
    const {connectedCells} = this;
    cells.forEach(cell => {
      if (connectedCells.includes(cell)) return;
      connectedCells.push(cell);
    })
  }

  get size() {
    const size = (new THREE.Box3).setFromObject(this.object3D).getSize(new THREE.Vector3);

    return Math.max(size.x, size.y, size.z);
  }
}
