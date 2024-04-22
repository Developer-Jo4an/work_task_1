import React from "react";
import PropTypes from "prop-types";


const InfoBg = React.forwardRef(
  function InfoBg({base, path}, ref) {
    return (
      <div className={"info__bg"} ref={ref}>
        {base && <div className="info__bg-base">
          <img src={base} alt="path-image-bg"/>
        </div>}

        <div className="info__bg-window">
          <picture>
            <source srcSet={"images/building-store/bg-mob.svg"} media={"(orientation: portrait)"}/>
            <img src={"images/building-store/bg.svg"} alt=""/>
          </picture>
        </div>
        {path && <div className="info__bg-path">
          <img src={path} alt="path-image-bg"/>
        </div>}

      </div>
    );
  });
export default InfoBg;
InfoBg.propTypes = {
  base: PropTypes.string,
  path: PropTypes.string,
};

