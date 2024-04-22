import THREE from "./threeGlobal";

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";

THREE.OrbitControls = OrbitControls;
THREE.GLTFLoader = GLTFLoader;
THREE.BufferGeometryUtils = BufferGeometryUtils;

const {InteractionManager} = require('./interaction/three.interactive');
THREE.InteractionManager = InteractionManager;

require('./materials/MultiplyMaterial');
require('./camera/ExtraOrthographicCamera');

export default THREE;
