import React, {useEffect, useState} from "react";
import {useScene} from "../../redux/reducer/scene";
import ExchangerItem from "./ExchangerItem";
import {getResourceProperty, getTimestamp} from "../../utils/empire/data";


const Exchanger = React.forwardRef(
  function Exchanger({}, ref) {

    const {exchanger, worldState} = useScene();
    const [, setUpdate] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => setUpdate(update => update + 1), 1000);
      return () => clearInterval(interval);
    }, [])

    if (!exchanger) return null;

    return (
      <div className={"exchanger"} ref={ref}>
        {exchanger.map((data, index) => {
          const lastExchange = worldState[`last_exchange_on_${data.receive_type}`];
          const currentMoney = worldState[getResourceProperty(data.afford_type)]
          const isAvailable = getTimestamp() >= lastExchange + data.waiting_time && currentMoney >= data.afford_quantity;

          return (<ExchangerItem key={index} isAvailable={isAvailable} {...data}/>)
        })}
      </div>
    );
  });
export default Exchanger;
Exchanger.propTypes = {};

