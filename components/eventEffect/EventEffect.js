import React, {useEffect, useMemo} from "react";
import {viewEffectDuration} from "../../constants/empire";
import classNames from "classnames";


const EventEffect = React.forwardRef(
  function EventEffect({type, onComplete}, ref) {
    const floodItems = useMemo(() => {
      let list = [];
      for (let i = 0; i < 30; i++) {
        list.push(
          <div className={`event-effect__flood event-effect__flood_${i + 1}`} style={{
            left: `${Math.floor(randomInteger(0, 150))}%`,
            animationDelay: `${randomInteger(-30, -3)}s`
          }}>
            <img src={"images/effects/flood-path.svg"} alt="snow-path"/>
          </div>
        )
      }
      return list;
    }, []);

    const snowItems = useMemo(() => {
      let list = [];
      for (let i = 0; i < 30; i++) {
        list.push(
          <div className="event-effect__snow" style={{
            left: `${Math.floor(randomInteger(0, 150))}%`,
            animationDelay: `${(i / 30) * -10 + Math.random()}s`
          }}>
            <img src={"images/effects/snowstorm-path.svg"} alt="snow-path"/>
          </div>
        )
      }
      return list;
    }, []);
    const tornadoItems = useMemo(() => {
      let list = [];
      for (let i = 0; i < 6; i++) {
        list.push(
          <div className={`event-effect__tornado-item event-effect__tornado-item_${i + 1}`} style={{}}>
            <img src={`images/effects/tornado-path-${i + 1}.png`} alt="tornado-path"/>
          </div>
        )
      }
      return list;
    }, []);

    function randomInteger(min, max) {
      return min + Math.random() * (max + 1 - min);
    }


    useEffect(() => {
      console.log("effect_start");
      const timeout = setTimeout(() => {
        console.log("effect_end");
        onComplete?.();
      }, viewEffectDuration);

      return () => clearTimeout(timeout);
    }, [type]);

    return (
      <div className={classNames("event-effect", {
        [`event-effect_${type}`]: type
      })} ref={ref}>
        {
          type &&
          <>
            <div className="event-effect__frame">
              <img src={`images/effects/${type}-frame.png`} alt="event-frame"/>
            </div>
            <div className="event-effect__content">
              {type === "snowstorm" && snowItems}
              {type === "flood" && floodItems}
              {type === "tornado" && tornadoItems}
            </div>
          </>
        }

      </div>
    );
  });
export default EventEffect;
EventEffect.propTypes = {};

