
export default function constructionAnimation(building, force) {

  const {view} = building;

  view.animationName = "constructionAnimation";

  return () => {
    view.animationName = null;
  }
}
