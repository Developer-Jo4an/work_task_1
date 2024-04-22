import React from "react";
import Info from "../info/Info";
import {useBuilding, useScene} from "../../redux/reducer/scene";
import {getImprovementLevel} from "../../utils/empire/data";
import {getLevelItem, getStoreText} from "../../constants/texts";


const InfoModal = React.forwardRef(
  function InfoModal(props, ref) {
    const {worldState: {world_state}} = useScene();
    const {type, area, is_broken, hasUpdate} = props;
    const {settings, worldState} = useBuilding(type);
    const improvementLevel = getImprovementLevel(settings, props);
    const {improvement} = props;

    const text = getStoreText(improvement);

    const info = {
      type,
      title: getLevelItem(type, improvementLevel),
      level: improvementLevel,
      image: `${type}-lvl_${improvementLevel + 1}`,
      info: {
        text: text[type],
      },
      buttons: [
        {
          action: "destroy",
          text: "Снести",
          className: "button_red"
        }
      ]
    };
    if (is_broken)
      info.buttons.unshift({
        action: "repair",
        text: "Отремонтировать"
      })
    else if (hasUpdate)
      info.buttons.unshift({
        action: "upgrade",
        text: "Улучшить"
      })


    return (
      <Info {...props} {...info}/>
    );
  });
export default InfoModal;
InfoModal.propTypes = {};

