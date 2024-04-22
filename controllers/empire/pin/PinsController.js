import {toScreenPosition} from "../../../utils/scene/three/three-utils";

export default class PinsController {

  pins = [];

  constructor({eventBus}) {

    this.onPinAdded = this.onPinAdded.bind(this);
    this.onPinRemoved = this.onPinRemoved.bind(this);

    eventBus.addEventListener("pin:added", this.onPinAdded);
    eventBus.addEventListener("pin:removed", this.onPinRemoved);
  }

  onPinAdded({data: {pin}}) {
    if (this.pins.includes(pin)) return;

    this.pins.push(pin);
  }

  onPinRemoved({data: {pin}}) {
    if (!this.pins.includes(pin)) return;

    this.pins.splice(this.pins.indexOf(pin), 1);
  }

  update({camera, renderer}) {
    this.pins.forEach(pin => {
      const {x, y, isVisible} = toScreenPosition(pin, camera, renderer, false);
      pin.viewData = {x, y, isVisible, updateAt: Date.now()};
    });
  }
}
