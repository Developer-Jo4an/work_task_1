import empireFactory from "../EmpireFactory";

export default class Car extends THREE.Object3D {

  speed = 1;

  _prevPosition = new THREE.Vector3;

  constructor(props) {
    super(props);

    const car = empireFactory.getItem("car");
    car.position.set(0, 0, 0);
    car.rotation.set(0, 0, 0);
    this.add(car);
  }

  update() {
    const {position, _prevPosition, _prevDirection} = this;

    const direction = new THREE.Vector3(
      position.x - _prevPosition.x,
      position.y - _prevPosition.y,
      position.z - _prevPosition.z,
    )

    const length = direction.length();

    direction.normalize();

    if (length >= 0.001 && (!_prevDirection || !direction.equals(_prevDirection)) && !this.position.equals(this._prevPosition))
      this.lookAt(
        position.x + direction.x,
        position.y + direction.y,
        position.z + direction.z,
      )

    this._prevDirection = direction
    this._prevPosition = this.position.clone();
  }

}
