function getTrees({object3D}) {
  return object3D.children.find(({name}) => name.includes("trees"));
}

function getEnvironment({object3D}) {
  return object3D.children.find(({name}) => name.includes("environment"));
}

function getCells({object3D}) {
  return object3D.children.find(({name}) => name.includes("cells"));
}


export function show(area, force) {
  getTrees(area).visible = false;
  getCells(area).visible = true;
  getEnvironment(area).visible = true;
}

export function hide(area, force) {
  getTrees(area).visible = true;
  getCells(area).visible = false;
  getEnvironment(area).visible = false;
}
