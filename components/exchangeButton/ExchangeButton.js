import React from "react";
import Button from "../baseComponents/gui/button/Button";
import Icon from "../baseComponents/gui/icon/Icon";


const ExchangeButton = React.forwardRef(
  function ExchangeButton({click}, ref) {
    return (

      <Button className={"exchange-button"}
              onClick={() => click()}
              ref={ref}>
        <Icon name={"exchange"}/>
      </Button>
    );
  });
export default ExchangeButton;
ExchangeButton.propTypes = {};

