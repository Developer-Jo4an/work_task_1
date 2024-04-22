import BaseTutorialStep from "./BaseTutorialStep";

export default class FirstRoad extends BaseTutorialStep {

  attach({storage, eventBus}) {
    super.attach({storage, eventBus});

    eventBus.addEventListener("empire-controller:ready", () => this.runState());
  }

  check(data) {
    if (!data) return;
    if (data.passed_tutorial) return;

    this.data = data;

    return !Object
      .values(data.world_state)
      .some((areaData) => Object.values(areaData).some((cell) => cell.type === "road" && !cell.improvement.is_start_improvement))
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
      if (area.originalName !== "area_1")
        area.areaVisible = false;
      else {
        area.cells.forEach(cell => {
          if (cell.name === "cell_0") {
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
    this.eventBus.dispatchEvent({type: "request-modal", data: {type: "firstRoad"}})
  }

}
