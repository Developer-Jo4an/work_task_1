import React from "react";
import LabelInput from "./LabelInput";
import {safeHTML} from "../../../../utils/safeHTML";

export default function Checkbox(props) {
  const type = props.type ? props.type : "checkbox";
  return <LabelInput type={type} {...props}
                     labelProps={{className: `checkbox checkbox_${type}`}}>
    <div className={"checkbox__box"}>
      {type === "checkbox" &&
      <div className={"checkbox__box-icon"}/>}
    </div>
    <div className={"checkbox__text"}>{safeHTML(props.text)}</div>
  </LabelInput>;
}
