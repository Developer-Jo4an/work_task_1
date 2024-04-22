import React, {useRef} from "react";
import Button from "../baseComponents/gui/button/Button";
import scene from "../../redux/reducer/scene";
import {useDispatch} from "react-redux";

const ExchangerItem = React.forwardRef(
  function ExchangerItem({id, isAvailable, afford_type, receive_type, afford_quantity, receive_quantity}, ref) {
    const dispatch = useDispatch();
    const inputRef = useRef();


    return (
      <div className={"exchanger__item"} ref={ref}>
        <h3
          className={"exchanger__item-name"}
          ref={ref}>
          {`${afford_quantity} ${afford_type} to ${receive_quantity} ${receive_type}`}
        </h3>
        <label className={"exchanger__item-label"}>
          quantity
          <input ref={inputRef} type={"number"} className={"exchanger__item-input"}/>
        </label>
        <Button
          disabled={!isAvailable}
          className={"exchanger__button"}
          onClick={() => dispatch(scene.thunks.exchange({id, quantity: Number(inputRef.current.value || 1)}))}>
          change
        </Button>
      </div>
    );
  });
export default ExchangerItem;
ExchangerItem.propTypes = {};
