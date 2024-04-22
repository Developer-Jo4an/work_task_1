import React from "react";
import {useScene} from "../../redux/reducer/scene";
import HeadPanelItem from "./HeadPanelItem";
import {resources} from "../../constants/empire";


const HeadPanel = React.forwardRef(
  function HeadPanel({}, ref) {
    const {worldState} = useScene();

    if (!worldState) return null;

    return (
      <div className={"head-panel"} ref={ref}>
        {Object
          .entries(worldState)
          .filter(([key]) => key.includes("_amount") && Object.keys(resources).includes(key.replace("_amount", "")))
          .map(([resource, value], index) => (
            <HeadPanelItem
              icon={`images/head-panel/icon-${index + 1}.png`}
              key={index}
              value={value}
              type={resource}
            />
          ))}

      </div>
    );
  });
export default HeadPanel;
HeadPanel.propTypes = {};

