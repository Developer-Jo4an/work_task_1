import THREE from "./threeGlobal";

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";

const {InteractionManager} = require('./interaction/three.interactive');
THREE.OrbitControls = OrbitControls;
THREE.GLTFLoader = GLTFLoader;
THREE.DRACOLoader = DRACOLoader;
THREE.BufferGeometryUtils = BufferGeometryUtils;
THREE.InteractionManager = InteractionManager;

export default THREE;
