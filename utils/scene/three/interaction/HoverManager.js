export default class HoverManager {

  items = [];

  _hoveredItem = null;

  constructor(domElement) {

    this.rollover = this.rollover.bind(this);
    this.rollout = this.rollout.bind(this);

    this.domElement = domElement;
  }

  add(item) {

    if (this.items.includes(item)) return;

    this.items.push(item);

    item.addEventListener("mouseover", this.rollover);
    item.addEventListener("mouseout", this.rollout);
  }

  remove(item) {
    if (!this.items.includes(item)) return;

    item.removeEventListener("mouseover", this.rollover);
    item.removeEventListener("mouseout", this.rollout);
  }

  set hoveredItem(hoveredItem) {
    this._hoveredItem = hoveredItem;

    this.domElement.style.cursor = this.hoveredItem?.cursor ?? "";
  }

  get hoveredItem() {
    return this._hoveredItem;
  }

  rollover(e) {
    this.hoveredItem = e.target;
  }

  rollout(e) {
    if (this.hoveredItem !== e.target) return;

    this.hoveredItem = null;
  }
}
