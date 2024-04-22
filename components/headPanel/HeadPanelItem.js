import React from "react";
import classNames from "classnames";


const HeadPanelItem = React.forwardRef(
  function HeadPanelItem({icon,value, type}, ref) {
    return (
      <div className={classNames(`head-panel__item head-panel__item_${type}`)} ref={ref}>
        <div className="head-panel__item-icon">
          <img src={icon} alt={type}/>
        </div>
        <div className="head-panel__item-value">{value}</div>
      </div>
    );
  });
export default HeadPanelItem;
HeadPanelItem.propTypes = {};

