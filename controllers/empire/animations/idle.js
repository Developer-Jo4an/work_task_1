
export default function idleAnimation(building, force) {
  const {view} = building;

  view.animationName = "idleAnimation"

  return () => {
    view.animationName = null;
  }
}
