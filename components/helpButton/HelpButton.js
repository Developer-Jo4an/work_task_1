import React from "react";
import Button from "../baseComponents/gui/button/Button";
import Icon from "../baseComponents/gui/icon/Icon";


const HelpButton = React.forwardRef(
  function HelpButton({click}, ref) {
    return (
      <Button className={"help-button"}
              onClick={() => click()}
              ref={ref}>
        <Icon name={"help"}/>
      </Button>
    );
  });
export default HelpButton;
HelpButton.propTypes = {};

