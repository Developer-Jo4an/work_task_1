import ThreeController from "../../utils/scene/containers/ThreeController";
import TestScene from "./test/TestScene";
import CellsController from "./building/CellsController";
import {InteractionManager} from "../../utils/scene/three/interaction/three.interactive";
import HoverManager from "../../utils/scene/three/interaction/HoverManager";
import ResourcesController from "./ResourcesController";
import EventsController from "./events/EventsController";
import {events, eventsPeriod} from "../../constants/empire";
import AssetsManager from "../../utils/scene/loader/plugins/AssetsManager";
import EnvironmentController from "./environment/EnvironmentController";
import empireFactory from "./EmpireFactory";
import StreetController from "./street/StreetController";
import Car from "./street/Car";
import {recursiveDisableAutoUpdateMatrix} from "../../utils/scene/three/three-utils";
import PerformanceStats from "../../utils/scene/three/performance/Stats";
import ExtraOrthographicCamera from "../../utils/scene/three/camera/ExtraOrthographicCamera";
import OrthographicCameraController from "../../utils/scene/three/camera/OrthographicCameraController";
import OrthographicCameraControls from "../../utils/scene/three/camera/OrthographicCameraControls";
import PinsController from "./pin/PinsController";
import Loader from "../../utils/scene/loader/Loader";
import {howlerManager} from "../../utils/scene/loader/plugins/howler/HowlerManager";
import {soundManager} from "../../utils/scene/sound/SoundManager";
import gsap from "gsap";
import tutorialController from "./tutorial/TutorialController";

global.window.gsap = gsap;
global.window.soundManager = soundManager;

THREE.ExtraOrthographicCamera = ExtraOrthographicCamera;

Loader.registerManager(howlerManager, "howler")

export default class EmpireController extends ThreeController {

  eventsController;

  constructor(data) {
    super(data);

    this.onStateUpdate = this.onStateUpdate.bind(this);

    const {eventBus, storage} = this;
    this.tutorialController = tutorialController;
    tutorialController.attach({eventBus, storage})

    this.eventBus.addEventListener("empire-wrapper:create-test-world", this.onCreateTestWorld.bind(this));
  }

  onLoad() {
    super.onLoad();
    this.init();
  }

  initializationSelect() {
    const {storage, currentScene, eventBus} = this;

    soundManager.onPlay("music", {loop: true, volume: 0.1});

    const model = AssetsManager.getAssetFromLib("LD", "gltf");
    storage.model = model;

    empireFactory.eventBus = eventBus;
    empireFactory.globalStorage = storage;

    this.pinsController = new PinsController({eventBus});

    new EnvironmentController({container: this.currentScene, storage});

    let childIndex = model.children.length;
    while (childIndex--)
      if (model.children[childIndex].name.includes("area_")) {
        const area = model.children[childIndex];
        recursiveDisableAutoUpdateMatrix(area);
        this.currentScene.add(area);
      }

    storage.eventsPeriod = eventsPeriod;
    storage.scene = currentScene;

    this.resourceController = new ResourcesController({eventBus, storage});

    const eventsController = this.eventsController = new EventsController({eventBus, storage});
    events.forEach(event => eventsController.addEvent(event));

    this.initInteractive();

    this.create();
    this.initAreas();

    this.initCameraController();
    this.initCars();

    this.eventBus.addEventListener("empire-wrapper:state-update", this.onStateUpdate);
    this.updateWorld(true);

    this.eventBus.dispatchEvent({type: "empire-controller:ready"});
  }

  initCameraController() {
    const {
      storage: {
        mainSceneSettings: {
          camera: {
            size,
            baseTarget,
            zoom,
            selectZoom,
            position
          }
        }
      },
      storage,
      eventBus,
      currentCamera
    } = this;

    currentCamera.size = size;

    currentCamera.zoom = zoom;

    currentCamera.position.set(
      position.x,
      position.y,
      position.z,
    )
    currentCamera.lookAt(
      baseTarget.x,
      baseTarget.y,
      baseTarget.z,
    )
    currentCamera.updateProjectionMatrix();

    const cameraController = new OrthographicCameraController({
      eventBus,
      storage,
      baseTargetPosition: baseTarget,
      basePosition: position,
      baseZoom: zoom,
      selectZoom,
      selectOffset: {
        x: (position.x - baseTarget.x),
        y: (position.y - baseTarget.y),
        z: (position.z - baseTarget.z),
      }
    });

    cameraController.camera = currentCamera;
    cameraController.moveTargetTo(baseTarget, true);
    this.cameraController = cameraController;

    new OrthographicCameraControls({
      storage,
      domElement: this.renderer.domElement,
      controller: cameraController
    })
  }

  initCamera() {
    return new THREE.ExtraOrthographicCamera(1000);
  }

  initCars() {
    const {storage, storage: {mainSceneSettings: {carsCount}}, currentScene, eventBus} = this;

    const streetController = this.streetController = new StreetController({storage, eventBus, scene: currentScene});
    const spawnVariants = [...streetController.cells];
    let i = carsCount;
    while (i--) {
      const [cell] = spawnVariants.splice(Math.floor(Math.random() * spawnVariants.length), 1);
      streetController.addCar(new Car(), cell);
    }
  }

  initInteractive() {
    this.storage.interactionManager = new InteractionManager(
      this.renderer,
      this.currentCamera,
      this.renderer.domElement
    );

    this.storage.hoverManager = new HoverManager(this.renderer.domElement);
  }

  onCreateTestWorld({data}) {
    const {currentScene} = this;
    currentScene.add(new TestScene(data));
  }

  onStateUpdate({data: {force}}) {
    this.updateWorld(force);
  }

  updateWorld(force) {
    const {storage: {state: {world_state, last_time_disaster}}} = this;

    this.eventsController.updateTime(last_time_disaster);
    this.resourceController.updateResources();
    this.cellsController.updateAreas(world_state, force)
  }

  initAreas() {
    const {currentScene, storage, eventBus} = this;

    this.cellsController = new CellsController({eventBus, storage});

    currentScene.traverse(
      child => {
        if (/^cell_\d+$/gi.test(child.name))
          this.initCell(child);
        else if (/^area_\d+$/gi.test(child.name))
          this.initArea(child)
      }
    );
  }

  initArea(child) {
    const {cellsController} = this;

    cellsController.createArea(child);
  }

  initCell(child) {
    const {cellsController} = this;
    child.name = child.name.replace(/\d{3}$/gi, "");
    cellsController.addCell(child);
  }

  initItems() {
    super.initItems();

    const {currentCamera} = this;

    currentCamera.position.set(0, 5, 5);
    currentCamera.lookAt(0, 0, 0);

    this.initControls();
  }

  initControls() {
    // this.controls = new THREE.OrbitControls(this.currentCamera, this.canvas);
  }

  update() {
    const delta = super.update();

    const {
      currentCamera,
      renderer,
      streetController,
      cellsController,
      resourceController,
      eventsController,
      pinsController,
      controls,
      cameraController,
      storage: {interactionManager}
    } = this;

    pinsController.update({delta, camera: currentCamera, renderer});
    streetController.update(delta);
    eventsController.update(delta);
    cellsController.update(delta);
    controls?.update();
    interactionManager.update(delta);
    resourceController.update({buildings: cellsController.buildings});
    cameraController.update(delta);
    PerformanceStats.update({scene: this.currentScene, renderer: this.renderer})

    requestAnimationFrame(this.update);
  }
}
