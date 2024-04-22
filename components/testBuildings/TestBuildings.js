import React from "react";
import {useScene} from "../../redux/reducer/scene";
import TestBuildingsArea from "./TestBuildingsArea";


const TestBuildings = React.forwardRef(
  function TestBuildings({}, ref) {

    const {worldState} = useScene();

    if (!worldState) return null;

    return (
      <div className={"test-buildings"} ref={ref}>
        {Object.entries(worldState).filter(([key]) => key.includes("_amount")).map(([resource, value]) => (
          <div className={"test-buildings__building-stat"} key={resource}>
            <div className={"test-buildings__building-title"}>{resource}</div>
            <div className={"test-buildings__building-value"}>{value}</div>
          </div>
        ))}
        {
          Object.entries(worldState.world_state).map(([name, data]) =>
            <TestBuildingsArea
              cells={data}
              name={name}
              key={name}
            />
          )}
      </div>
    );
  });
export default TestBuildings;
TestBuildings.propTypes = {};

