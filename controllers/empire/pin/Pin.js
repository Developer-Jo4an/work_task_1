import getId from "../../../utils/getId";

export default class Pin extends THREE.Object3D {

  _view;

  _viewData;

  visible = true;

  constructor({name, eventBus, onClick, ...data}) {
    super();
    this.setView = this.setView.bind(this);

    this.uuid = getId();
    this.name = name;
    this.data = data;
    this.onClick = onClick;
    this.eventBus = eventBus;
  }

  setView(view) {
    this.view = view;
    this.updateViewStyle();
  }

  set view(view) {
    this._view = view;
  }

  get view() {
    return this._view;
  }

  set viewData(viewData) {
    this._viewData = viewData;
    this.updateViewStyle();
  }

  get viewData() {
    return this._viewData;
  }

  updateViewStyle() {
    if (!this.viewData || !this.view) return;
    const {viewData: {x, y, isVisible}, view, visible} = this;

    view.style.opacity = isVisible ? "1" : "0";
    view.style.pointerEvents = isVisible ? "" : "none";
    view.style.display = visible ? "" : "none";
    view.style.transform = `translate(${x}px, ${y}px)`;
  }

  onAdded() {
    this.eventBus.dispatchEvent({type: "pin:added", data: {pin: this}});
    this.added = true;
    return this;
  }

  onRemove() {
    this.eventBus.dispatchEvent({type: "pin:removed", data: {pin: this}});
    this.added = false;
    return this;
  }
}
