import {useEffect} from "react";
import {setImportPromise} from "../../../utils/helpers/import";
import Scene from "./Scene";

export default function SceneWrapper() {
  useEffect(() => {
    const promise =
      import("../../../pixi/pixi")
        .then(() => import("../../controller/CustomPixiWrapper"))
        .then(data => {
          const {default: CustomPixiWrapper} = data;
          CustomPixiWrapper.instance.init();
          return data;
        })

    setImportPromise(promise);
  }, [])

  return (
    <div>
      <Scene/>
    </div>
  )
}
