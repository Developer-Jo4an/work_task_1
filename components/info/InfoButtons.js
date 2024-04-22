import React from "react";
import PropTypes from "prop-types";
import Button from "../baseComponents/gui/button/Button";
import {safeHTML} from "../../utils/safeHTML";
import classNames from "classnames";


const InfoButtons = React.forwardRef(
  function InfoButtons({list, actions, close}, ref) {
    const items = list?.map((item, index) => (
      <Button key={`button-${index}`}
              {...item}
              onClick={() => {
                actions?.[item.action ?? "base"]?.action?.(item);
                close && close();
              }}
              disabled={!(actions?.[item.action ?? "base"]?.checker?.(item) ?? true)}
              className={classNames("info__button", {
                [item.className]: item.className
              })}
      >{safeHTML(item.text)}</Button>
    ));
    return (
      <div className={"info__buttons"} ref={ref}>
        {items}
      </div>
    );
  });
export default InfoButtons;
InfoButtons.propTypes = {};

