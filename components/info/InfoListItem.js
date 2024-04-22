import React from "react";
import {safeHTML} from "../../utils/safeHTML";
import Button from "../baseComponents/gui/button/Button";
import PropTypes from "prop-types";
import InfoInfo from "./InfoInfo";
import useWindowSize from "../../hooks/useWindowSize";


const InfoListItem = React.forwardRef(
  function InfoListItem({type, level, actions, action, ...etc}, ref) {
    const [width, height] = useWindowSize();

    return (
      <div className={"info__list-item"} ref={ref}>
        <div className="info__list-item-image">
          <img src={`images/builds/${type}-lvl_${level + 1}.png`} alt={etc?.title}/>
        </div>
        {width > height && <InfoInfo {...etc} pricePrefix={"Стоимость постройки: "}/>}
        {width > height &&
          <Button className="info__list-item-button"
                  onClick={() => actions?.[action ?? "base"]?.action?.(arguments[0])}
                  disabled={!(actions?.[action ?? "base"]?.checker?.(arguments[0]) ?? true)}>
            Построить
          </Button>
        }
      </div>
    );
  });
export default InfoListItem;
InfoListItem.propTypes = {};

