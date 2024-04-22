import React from "react";
import {safeHTML} from "../../utils/safeHTML";
import classNames from "classnames";
import Button from "../baseComponents/gui/button/Button";
import InfoInfo from "../info/InfoInfo";
import CustomModal from "../baseComponents/gui/customModal/CustomModal";
import {useModal} from "../../hooks/useModal";
import InfoButtons from "../info/InfoButtons";


const MessageModal = React.forwardRef(
  function MessageModal(props, ref) {
    const {title, text, buttons, actions} = props;
    const {id, closeModal} = useModal();
    return (
      <CustomModal className={"custom-modal__message"}>
        <div className={"message-modal"} ref={ref}>
          <div className="message-modal__bg">
            <img src={"images/building-store/bg.svg"} alt=""/>
          </div>
          <div className="message-modal__content">
            <InfoInfo {...props}/>
            <InfoButtons list={buttons} actions={actions} close={() => closeModal(id)}/>
          </div>
          {/*<Button className="button_circle message-modal__close-button"*/}
          {/*        onClick={() => {*/}
          {/*          closeModal(id);*/}
          {/*        }}*/}
          {/*>*/}
          {/*  <span className="message-modal__close-button-icon"/>*/}
          {/*</Button>*/}
        </div>
      </CustomModal>

    );
  });
export default MessageModal;
MessageModal.propTypes = {};

