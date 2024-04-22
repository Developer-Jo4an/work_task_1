import React from "react";
import Info from "../info/Info";
import {useBuilding} from "../../redux/reducer/scene";
import {getImprovementLevel} from "../../utils/empire/data";
import {useDispatch} from "react-redux";
import {useModal} from "../../hooks/useModal";
import {getLevelItem, getStoreText, pricePrefixType} from "../../constants/texts";


const UpdateBuild = React.forwardRef(
  function UpdateBuild(props, ref) {

    const {type, is_broken, improvement, nextImprovement} = props;
    const {settings} = useBuilding(type);
    const improvementLevel = getImprovementLevel(settings, props);

    const {repair_cost} = improvement;
    const {cost} = nextImprovement ?? {};

    const text = getStoreText(is_broken ? improvement : nextImprovement);


    const info = {
      type,
      title: is_broken ? getLevelItem(type, improvementLevel) : props.title,
      level: improvementLevel + 1,
      image: `${type}-lvl_${improvementLevel + 1}`,
      info: {
        title: is_broken ? null : getLevelItem(type, improvementLevel + 1),
        text: text[type],
        price: is_broken ? repair_cost : cost,
        pricePrefix: is_broken ? pricePrefixType.repair : pricePrefixType.update
      },
      buttons: [
        {
          text: is_broken ? "Отремонтировать" : "Улучшить",
          action: is_broken ? "repair" : "upgrade",
        }
      ]
    };
    if (is_broken)
      info.buttons.push({
        text: "Снести",
        action: "destroy",
        className: "button_red"
      })

    return (
      <Info {...props} {...info}/>
    );
  });
export default UpdateBuild;
UpdateBuild.propTypes = {};

