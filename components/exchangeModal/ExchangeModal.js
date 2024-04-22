import React, {useEffect, useState} from "react";
import CustomModal from "../baseComponents/gui/customModal/CustomModal";
import {useModal} from "../../hooks/useModal";
import Button from "../baseComponents/gui/button/Button";
import {safeHTML} from "../../utils/safeHTML";
import InfoButtons from "../info/InfoButtons";
import Exchange from "../exchange/Exchange";
import scene, {useScene} from "../../redux/reducer/scene";
import {resources} from "../../constants/empire";
import {getResourceProperty} from "../../utils/empire/data";
import {useDispatch} from "react-redux";
import declOfNum from "../info/DeclOfNum";


const ExchangeModal = React.forwardRef(
  function ExchangeModal({title, text, actions, fromProps, toProps, buttons}, ref) {
    const dispatch = useDispatch();
    const {id, closeModal} = useModal();

    const [type, setType] = useState(0);
    const [value, setValue] = useState(0);

    const {worldState, exchanger} = useScene();
    if (!worldState) return null;

    const fromList = exchanger.reduce((arr, {afford_type}) => {
      if (!arr.includes(afford_type)) arr.push(afford_type);
      return arr;
    }, []);

    const toList = exchanger
      .filter(({afford_type}) => afford_type === fromList[type])
      .map(({receive_type}) => receive_type);

    const [typeTo, setTypeTo] = useState(0);

    const currentExchange = exchanger.find(({
                                              afford_type,
                                              receive_type
                                            }) => afford_type === fromList[type] && receive_type === toList[typeTo]);
    const from = value * currentExchange.afford_quantity;

    actions = {
      ...actions,
      change: {
        checker() {
          return true;
        },
        action() {
          dispatch(scene.thunks.exchange({
            id: currentExchange.id,
            quantity: Number(value)
          }))
        }
      },
      close: {
        action() {
          closeModal(id);
        }
      }
    }

    useEffect(() => {
      let cValue = value;
      const {afford_quantity, receive_quantity, afford_type} = currentExchange;

      let from = value * afford_quantity;
      while (from > worldState[getResourceProperty(afford_type)]) {
        cValue -= receive_quantity;
        from = cValue * afford_quantity
      }
      if (cValue !== value) setValue(cValue);
    });

    return (
      <CustomModal className={"custom-modal__message"}>
        <div className={"exchange-modal"} ref={ref}>
          <div className="exchange-modal__bg">
            <img src={"images/building-store/bg.svg"} alt=""/>
          </div>
          <div className="exchange-modal__content">
            <h2
              className="exchange-modal__title">
              {safeHTML(title)}
            </h2>
            <p className="exchange-modal__text">
              {safeHTML(`Курс обмена ${currentExchange.afford_quantity}&nbsp;к ${currentExchange.receive_quantity}.`)}
            </p>
            <Exchange {...fromProps} items={fromList}
                      onChange={index => {
                        setType(index);
                        setTypeTo(0);
                      }}
                      type={"from"}
                      value={from}
                      setValue={setValue}

                      onIncrease={() => {
                        if ((value + currentExchange.receive_quantity) * currentExchange.afford_quantity <= worldState[getResourceProperty(currentExchange.afford_type)]) {
                          setValue(value + currentExchange.receive_quantity)
                        }
                      }}
                      onDecrease={() => {
                        if ((value - currentExchange.receive_quantity) >= 0 && (value - currentExchange.receive_quantity) * currentExchange.afford_quantity <= worldState[getResourceProperty(currentExchange.afford_type)]) {
                          setValue(value - currentExchange.receive_quantity)
                        }
                      }}
            />
            <Exchange {...toProps}
                      items={toList}
                      type={"to"}
                      value={value}
                      onChange={setTypeTo}
            />
            {buttons && <InfoButtons className={"exchange-modal__buttons"}
                                     actions={actions} list={buttons}/>}
            <Button className={"button_circle exchange-modal__close-button"}
                    onClick={() => closeModal(id)}
            >
              <span className="tutorial__close-button-icon"/>
            </Button>
          </div>
        </div>
      </CustomModal>

    );
  });
export default ExchangeModal;
ExchangeModal.propTypes = {};

