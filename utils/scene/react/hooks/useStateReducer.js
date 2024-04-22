import {useEffect} from "react";

export default function useStateReducer(reducers = {}, ignoreNextStates = [], nextState, state, controller) {
  useEffect(() => {
    if (!controller) return;
    const eventData = {state, promise: null};
    controller.eventBus.dispatchEvent({type: "apply-state", data: eventData})
    const {promise: controllerPromise} = eventData;
    let ignorePromise = ignoreNextStates.indexOf(state) !== -1;

    if (typeof reducers[state] === "function")
      reducers[state](controllerPromise)

    if (!ignorePromise)
      controllerPromise.then(() => nextState(state));
  }, [state, controller]);
}
