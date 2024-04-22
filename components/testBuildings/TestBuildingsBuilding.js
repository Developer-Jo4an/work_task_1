import React from "react";
import scene, {useBuilding, useScene} from "../../redux/reducer/scene";
import Button from "../baseComponents/gui/button/Button";
import {useDispatch} from "react-redux";
import {getImprovementLevel, getResourceProperty, getState} from "../../utils/empire/data";
import {resources} from "../../constants/empire";


const TestBuildingsBuilding = React.forwardRef(
  function TestBuildingsBuilding(props, ref) {

    const {type, area, is_broken} = props;
    const dispatch = useDispatch();
    const {settings, worldState} = useBuilding(type);
    const improvementLevel = getImprovementLevel(settings, props);
    const state = getState(settings, props);
    const currentMoney = worldState[getResourceProperty(resources.money)]

    const disabledUpgrade = state !== "produce" && state !== "idle" ||
      improvementLevel + 1 >= settings?.improvements.length ||
      settings.improvements[improvementLevel + 1].cost > currentMoney

    const disabledDestroy = settings.improvements[improvementLevel].destroy_cost > currentMoney;
    const repairButton =
      is_broken ? (
        <Button
          className={"test-buildings__button"}
          disabled={settings.improvements[improvementLevel].repair_cost > currentMoney}
          onClick={() => dispatch(scene.thunks.repair({area, cell: props.cell}))}>
          repair
        </Button>
      ) : null;

    return (
      <div className={"test-buildings__building"} ref={ref}>
        {[
          {name: "cell"},
          {name: "type"},
          {name: "state", value: state},
          {
            name: "improvementLevel",
            value: improvementLevel
          }].map(
          ({name, value}) =>
            (
              <div className={"test-buildings__building-stat"} key={name}>
                <div className={"test-buildings__building-title"}>{name}</div>
                <div className={"test-buildings__building-value"}>{value ?? props[name]}</div>
              </div>
            )
        )}
        <Button
          className={"test-buildings__button"}
          disabled={disabledUpgrade}
          onClick={() => dispatch(scene.thunks.upgrade({area, cell: props.cell}))}>
          upgrade
        </Button>
        {repairButton}
        <Button
          className={"test-buildings__button"}
          disabled={disabledDestroy}
          onClick={() => dispatch(scene.thunks.destroy({area, cell: props.cell}))}>
          destroy
        </Button>
      </div>
    );
  });
export default TestBuildingsBuilding;
TestBuildingsBuilding.propTypes = {};

