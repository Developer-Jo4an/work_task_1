import System from "../../../core/System";
import InputController from "../../../../controllers/input/InputController";
import KeyboardPlugin from "../../../../controllers/input/keyboardPlugin/KeyboardPlugin";

export default class InputSystem extends System {

  constructor(data) {
    super(data);
    const {inputSystem: {preset} = {}} = data;

    this.inputController = new InputController({
      eventBus: this.eventBus,
      basePlugins: [new KeyboardPlugin]
    });

    this.eventBus.addEventListener("pinball:events-activity-change", this.onActivityChange.bind(this));
    if (preset)
      this.addPreset(preset);
    else console.log("InputSystem preset not found");

    const keyboardController = this.inputController.getPluginByName("keyboard")
    keyboardController.attach(global.window);
    if (global.window.top !== global.window) {
      try {
        keyboardController.attach(global.window.top);
      } catch (e) {
        console.log(e)
      }
    }
  }

  addPreset(presetActions) {
    this.inputController.addPreset(presetActions);
  }


  onActivityChange({data}) {
    this.inputController.onChangeActivity(data);
  }


}
