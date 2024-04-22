import React from "react";
import {useModal} from "../../hooks/useModal";
import Button from "../baseComponents/gui/button/Button";
import CustomModal from "../baseComponents/gui/customModal/CustomModal";
import {safeHTML} from "../../utils/safeHTML";


const StartModal = React.forwardRef(
  function StartModal(props, ref) {
    const {image, title, text, button, onClick, onClose} = props;
    const {id, closeModal} = useModal();

    return (
      <CustomModal className={"custom-modal__message"}>
        <div className={"start-modal"} ref={ref}>
          <div className="start-modal__bg">
            <img src={"images/building-store/bg.svg"} alt=""/>
          </div>
          <div className="start-modal__content">
            {image && <div className="start-modal__image">
              <img src={image} alt=""/>
            </div>}
            {title && <h2 className="start-modal__title">{safeHTML(title)}</h2>}
            {text && <p className="start-modal__text">{safeHTML(text)}</p>}
            {button &&
              <Button {...button} className={"start-modal__button"}
                      onClick={() => {
                        onClick?.()
                        closeModal(id);
                      }}
              >
                {safeHTML(button.text)}
              </Button>
            }
            <Button className="button_circle start-modal__close-button"
                    onClick={() => {
                      onClick?.()
                      closeModal(id);
                    }}
            >
              <span className="start-modal__close-button-icon"/>
            </Button>
          </div>
        </div>
      </CustomModal>
    );
  });
export default StartModal;
StartModal.propTypes = {};

