import React from "react";
import Button from "../baseComponents/gui/button/Button";
import Icon from "../baseComponents/gui/icon/Icon";


const ChecklistButton = React.forwardRef(
  function ChecklistButton({click}, ref) {
    return (
      <Button className={"checklist-button"}
              onClick={() => click()}
              ref={ref}>
        <Icon name={"checklist"}/>
      </Button>

    );
  });
export default ChecklistButton;
ChecklistButton.propTypes = {};

