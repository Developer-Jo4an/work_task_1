import BaseTutorialStep from "./BaseTutorialStep";

export default class FirstField extends BaseTutorialStep {

  constructor() {
    super();
    this.onCheckModalContent = this.onCheckModalContent.bind(this);
  }

  attach({storage, eventBus}) {
    super.attach({storage, eventBus});

    eventBus.addEventListener("empire-controller:ready", () => this.runState());
    eventBus.addEventListener("check-modal-content", this.onCheckModalContent);
  }

  onCheckModalContent(e) {
    if (this.state === "idle") return;

    if (e.data.type === "storeModal") {
      const content = {...e.data.content};

      content.types = content.types.filter((type) => type === "field");

      e.data.content = content;
    }
  }

  check(data) {
    if (!data) return;
    if (data.passed_tutorial) return;

    this.data = data;

    return !Object
      .values(data.world_state)
      .some((areaData) => Object.values(areaData).some((cell) => cell.type === "field"))
  }

  run() {
    this.baseTutorialPromise.then(() => this.state = "disable");
  }

  disable() {

    this.state = "idle";

    const event = {type: "get-areas", data: {result: null}};
    this.eventBus.dispatchEvent(event);

    const areas = event.data.result;

    if (!areas) return;
    Object.values(areas).forEach(area => {
      area.areaVisible = true;

      area.cells.forEach(cell => {
        cell.building.hiddenPins = false;
        cell.interactiveBbox = true;
      });
    })
  }

  disableSelect() {
    const event = {type: "get-areas", data: {result: null}};
    this.eventBus.dispatchEvent(event);

    const areas = event.data.result;

    if (!areas) return;
    Object.values(areas).forEach(area => {
      if (area.originalName !== "area_1") area.areaVisible = false; else {
        area.cells.forEach(cell => {
          if (cell.name === "cell_1") {
            console.log("cell");
          } else {
            cell.building.hiddenPins = true;
            cell.interactiveBbox = false;
          }
        });
      }
    })

    this.state = "showModal";
  }

  showModalSelect() {
    this.eventBus.dispatchEvent({type: "request-modal", data: {type: "firstField"}})
  }
}
