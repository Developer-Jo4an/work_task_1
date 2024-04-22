import React from "react";
import CustomModal from "../baseComponents/gui/customModal/CustomModal";
import Button from "../baseComponents/gui/button/Button";
import {safeHTML} from "../../utils/safeHTML";
import {useModal} from "../../hooks/useModal";


const HelpModal = React.forwardRef(
  function HelpModal(props, ref) {
    const {image, text} = props;
    const {id, closeModal} = useModal();
    return (
      <CustomModal className={"custom-modal__message"}>
        <div className={"help-modal"} ref={ref}>
          <div className="help-modal__bg">
            <img src={"images/building-store/bg.svg"} alt=""/>
          </div>
          <div className="help-modal__content">
            <div className="help-modal__image">
              <img src={image} alt=""/>
            </div>
            <div className="help-modal__text">{safeHTML(text)}</div>
            <Button className={"help-modal__button"}
                    onClick={() => {
                      closeModal(id);
                    }}
            >{`Далее`}</Button>
            <Button className={"help-modal__close-button"}
                    onClick={() => {
                      closeModal(id);
                    }}
            >
              <span className={"help-modal__close-button-icon"}/>
            </Button>
          </div>
        </div>
      </CustomModal>
    );
  });
export default HelpModal;
HelpModal.propTypes = {};

