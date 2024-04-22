import React, {useEffect, useRef} from "react";
import classNames from "classnames";


const MapPin = React.forwardRef(
  function MapPin({type, setView, onClick, interactive}, topRef) {
    //type = "field" / "factory" / "store" / "repair" / "empty" / "road" / "office" / "forest"

    const ref = useRef(null);

    useEffect(() => {
      setView?.(ref.current);

      return () => {
        setView?.(null);
      }
    }, []);

    return (
      <div
        className={classNames("map-pin", {["map-pin_interactive"]: interactive})}
        ref={ref}
        onClick={onClick}>
        <div className="map-pin__tail">
          <img src={`images/pins/tail.svg`} alt={'tail'}/>
        </div>
        <div className="map-pin__image">
          <img src={`images/pins/${type}.png`} alt={type}/>
        </div>
      </div>
    );
  });
export default MapPin;
MapPin.propTypes = {};

