import React, {useRef, useState} from "react";
import scene, {useScene} from "../../redux/reducer/scene";
import TestBuildingsBuilding from "./TestBuildingsBuilding";
import Button from "../baseComponents/gui/button/Button";
import {useDispatch} from "react-redux";


const TestBuildingsArea = React.forwardRef(
  function TestBuildingsArea({name, cells}, ref) {
    const [toggle, setToggle] = useState(false);
    const inputRef = useRef();
    const dispatch = useDispatch();
    const {settings: {buildings}} = useScene();
    console.log(buildings);
    const content = (
      <>
        <input ref={inputRef} type={"text"}/>
        {
          buildings.map(({type}, index) =>
            <Button
              className={"test-buildings__button"}
              key={index}
              onClick={() => dispatch(scene.thunks.build({area: name, type, cell: inputRef.current.value}))}>
              {`build ${type}`}
            </Button>
          )
        }
        {Object.values(cells).map(building => <TestBuildingsBuilding {...building} area={name} key={building.cell}/>)}
      </>
    )

    return (
      <div className={"test-buildings__area"} ref={ref}>
        <h3>{name}</h3>
        <Button
          className={"test-buildings__button"}
          onClick={() => setToggle(toggle => !toggle)}>
          {`Toggle`}
        </Button>
        {toggle ? content : null}
      </div>
    );
  });
export default TestBuildingsArea;
TestBuildingsArea.propTypes = {};

