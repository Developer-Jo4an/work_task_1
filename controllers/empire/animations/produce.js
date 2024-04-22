import {cycleAnimation, inAnimation} from "./resource";

export default function produceAnimation(building, force) {
  const {view} = building;

  view.animationName = "produceAnimation"


  return () => {
    view.animationName = null;
  }
}

export function produceCompleteAnimation(building, force) {
  const {view, resourceItem, backgroundResource} = building;
  let animationData;
  view.animationName = "produceComplete"

  if (resourceItem) {
    animationData = inAnimation({item: resourceItem, background: backgroundResource});
    animationData.promise.then(() => {
      animationData = cycleAnimation({item: resourceItem, background: backgroundResource});
    })
  }

  return () => {
    view.animationName = null;

    if (animationData) animationData.kill();
  }
}
