import Cell from "./Cell";
import {mix3} from "../../../utils/scene/utils/math/vector";
import {FPS} from "../../../constants/empire";

export default class StreetController {

  cells = [];

  cars = [];

  constructor({storage, eventBus, scene}) {
    this.storage = storage;
    this.eventBus = eventBus;
    this.scene = scene;
    this.cellSize = 0;

    this.getCells();
    this.connectCells(this.cells[0], [...this.cells]);
  }

  get openedCells() {
    return this.cells.filter(({isOpened}) => isOpened);
  }

  update(delta) {
    const {cars, storage: {mainSceneSettings: {baseSpeed}}} = this;
    const deltaMod = delta / FPS;

    cars.forEach(car => {
      const {speed: cSpeed, streetData: {currentCell}} = car;

      car.visible = currentCell.isOpened;
      if (!car.visible) {
        return;
      }

      let distance = cSpeed * baseSpeed * deltaMod;

      while (distance) {
        const length = car.streetData.path.getLength();
        const deltaProgress = distance / length;

        if (car.streetData.progress + deltaProgress + .0001 > 1) {
          distance = (car.streetData.progress + deltaProgress - 1) * length;
          this.onPathComplete(car);
        } else {
          distance = 0;
          car.streetData.progress = car.streetData.progress + deltaProgress;
        }
      }
      const position = car.streetData.path.getPointAt(car.streetData.progress);
      car.position.copy(position);
      car.update();
    })

    cars.forEach(car => this.checkSpeed(car, deltaMod));
  }

  checkSpeed(car, deltaMod) {
    const {streetData: {nextCell, currentCell}} = car;
    const current = currentCell.asCurrent.filter(cCar =>
      car.streetData.nextCell === cCar.streetData.nextCell
    );
    const next = nextCell.asCurrent.filter(cCar =>
      car.streetData.currentCell === cCar.streetData.previousCell &&
      cCar.streetData.progress < 0.5
    );
    if (
      next.length ||
      nextCell.connectedCells.length > 2 && nextCell.asCurrent.length ||
      currentCell.connectedCells.length > 2 && currentCell.asCurrent.indexOf(car) !== 0 ||
      current.length && current.indexOf(car)
    ) {
      car.speed *= 0.9 ** deltaMod;
      if (car.speed < 0.0001) car.speed = 0;

    } else car.speed = Math.min(1, Math.max(0.1, car.speed) * (2 ** deltaMod));
  }

  onPathComplete(car) {
    car.streetData.previousCell = car.streetData.currentCell;
    car.streetData.currentCell = car.streetData.nextCell;

    this.chooseNextCell(car, true);
    this.generateCarPath(car);
  }

  addCar(car, startCell) {
    this.scene.add(car);

    const {connectedCells} = startCell;
    car.streetData = {
      currentCell: startCell,
      previousCell: connectedCells[Math.floor(Math.random() * connectedCells.length)],
      nextCell: null,
      path: null,
      progress: 0
    };
    this.chooseNextCell(car);
    this.generateCarPath(car);

    this.cars.push(car);
  }


  generateCarPath(car) {
    const {
      streetData: {
        currentCell: {position: cPosition},
        nextCell, nextCell: {position: nPosition},
        previousCell, previousCell: {position: pPosition},
      }
    } = car;

    let start, end, middle;

    end = mix3(cPosition, nPosition, .5)

    if (nextCell === previousCell)
      start = mix3(cPosition, nPosition, -.5)
    else
      start = mix3(pPosition, cPosition, .5)

    middle = cPosition;


    const sPoint = this.calcPointWithOffset(start, start, middle);
    const ePoint = this.calcPointWithOffset(end, middle, end);
    const mPoint = this.calcPointWithOffset(middle, start, end);

    car.streetData.path = new THREE.QuadraticBezierCurve3(
      sPoint, mPoint, ePoint
    );
    car.streetData.progress = 0;
  }

  calcPointWithOffset(point, start, end) {
    const {
      storage: {mainSceneSettings: {roadOffset}},
    } = this;

    const rotate = new THREE.Euler(0, -Math.PI / 2, 0);
    const vec3 = (new THREE.Vector3(end.x - start.x, end.y - start.y, end.z - start.z)).normalize()
    vec3.applyEuler(rotate).multiplyScalar(roadOffset).add(point);

    return vec3;
  }

  chooseNextCell(car, isFilterOpened) {
    const {streetData: {currentCell: {connectedCells}, previousCell}} = car;

    let nextCell = previousCell;
    let variants = connectedCells.filter(cell => cell !== previousCell && !cell.asCurrent.length && (isFilterOpened ? cell.isOpened : true));
    if (!variants.length)
      variants = connectedCells.filter(cell => cell !== previousCell && (isFilterOpened ? cell.isOpened : true));

    if (variants.length)
      nextCell = variants[Math.floor(Math.random() * variants.length)];

    car.streetData.nextCell = nextCell;

    previousCell.onRemoveItem(car);
    car.streetData.currentCell.onAsCurrent(car);
    nextCell.onAsNext(car);
  }

  connectCells(currentCell, cells) {
    const nearest = cells.filter(cell =>
      cell !== currentCell &&
      cell.position.distanceTo(currentCell.position) < this.cellSize + 0.001
    );
    cells.splice(cells.indexOf(currentCell), 1);

    currentCell.connect(...nearest);

    nearest.forEach(cell => {
      cell.connect(currentCell)
      if (cells.includes(cell))
        this.connectCells(cell, cells);
    });
  }

  getCells() {
    const {scene} = this;

    scene.traverse(child => {
      if (child.name?.includes("road") && !child.parent.name.includes("road") && child.parent.name.includes("lvl_1"))
        this.saveCell(child);
    });
  }

  saveCell(object3D) {
    const cell = new Cell({object3D})
    this.cells.push(cell);

    this.cellSize = Math.max(cell.size, this.cellSize);
  }
}
