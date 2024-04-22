import React from "react";
import {safeHTML} from "../../utils/safeHTML";
import classNames from "classnames";

const InfoInfo = React.forwardRef(
  function InfoInfo({title, text, price, pricePrefix, className}, ref) {
    return (
      <div className={classNames("info__info",{
        [className]:className
      })} ref={ref}>
        {title && <strong className="info__info-title">{safeHTML(title)}</strong>}
        {text && <div className="info__info-text">{safeHTML(text)}</div>}
        {pricePrefix ? <div className="info__info-price">
          <div className="info__info-price-text">{`${pricePrefix} ${price}`}</div>
          <div className="info__info-price-icon">
            <img src={"images/head-panel/icon-3.png"} alt=""/>
          </div>
        </div> : <></>}

      </div>
    );
  });
export default InfoInfo;
InfoInfo.propTypes = {};

