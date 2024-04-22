import React from "react";
import InfoBg from "./InfoBg";
import {safeHTML} from "../../utils/safeHTML";
import InfoList from "./Infolist";
import InfoButtons from "./InfoButtons";
import classNames from "classnames";
import Button from "../baseComponents/gui/button/Button";
import InfoInfo from "./InfoInfo";
import InfoChecklist from "./InfoChecklist";
import CustomModal from "../baseComponents/gui/customModal/CustomModal";
import {useModal} from "../../hooks/useModal";


const Info = React.forwardRef(
  function Info({mod, bg, title, actions, actionsList, list, image, info, checklist, buttons}, ref) {
    const {id, closeModal} = useModal();
    return (
      <CustomModal className={"custom-modal_info"}>
        <div className={classNames("info", {
          [`info_store`]: list,
          [`info_${mod}`]: mod
        })} ref={ref}>
          <InfoBg {...bg}/>
          <div className="info__content">
            {title && <h3 className="info__title">{safeHTML(title)}</h3>}
            {list && <InfoList actions={actions} list={list}/>}
            {image && <div className="info__image">
              <img src={`images/builds/${image}.png`} alt={title}/>
            </div>}
            {info && <InfoInfo {...info}/>}
            {checklist && <InfoChecklist list={checklist}/>}
            {buttons && <InfoButtons actions={actions} list={buttons}/>}
          </div>
          <Button className="button_circle info__close-button"
                  onClick={() => {
                    closeModal(id);
                  }}
          >
            <span className="info__close-button-icon"/>
          </Button>
        </div>
      </CustomModal>

    );
  });
export default Info;
Info.propTypes = {};

