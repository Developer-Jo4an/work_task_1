import React, {useState} from "react";
import classNames from "classnames";
import Checkbox from "../baseComponents/gui/form/Checkbox";
import {required} from "../../constants/form";
import Icon from "../baseComponents/gui/icon/Icon";
import {Scrollbar} from 'react-scrollbars-custom';


const InfoChecklist = React.forwardRef(
  function InfoChecklist({list}, ref) {
    const items = list?.map(({
                               text, done
                             }, index) => (
      <label key={`item-${index}`} className="info__checklist-item">
        <input type="checkbox" checked={done} disabled={true}/>
        <span className="info__checklist-item-bg">
          <img src={"images/building-store/todo-img.png"} alt="todo-img"/>
        </span>
        <span className="info__checklist-item-icon">
          <Icon name={"done"}/>
        </span>
        <span className="info__checklist-item-text">
          {text}
        </span>
      </label>
    ));
    return (
      <div className={classNames("info__checklist")} ref={ref}>

        <Scrollbar noScrollX
                   trackClickBehavior={'step'}
                   wrapperProps={{
                     style: {
                       inset: '0'
                     }
                   }}
                   trackYProps={{
                     style: {
                       width: '.2em',
                       right: '-.4em',
                       background: '#D2EFC8'
                     }
                   }}
                   thumbYProps={{
                     style: {
                       background: 'linear-gradient(90deg, #98D21B 0%, #2F911F 100%)'
                     }
                   }}
                   permanentTrackY={false}>
          <div className="info__checklist-items">
            {items}
          </div>
        </Scrollbar>
      </div>
    );
  });
export default InfoChecklist;
InfoChecklist.propTypes = {};

