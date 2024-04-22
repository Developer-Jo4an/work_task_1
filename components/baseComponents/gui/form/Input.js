import React, {
  cloneElement,
  createElement,
  Fragment,
  isValidElement
} from "react";
import {Controller} from "react-hook-form";
import InputMask from "react-input-mask";
import * as PropTypes from "prop-types";


export default function Input({
                                as = "input",
                                children,
                                register,
                                control,
                                error,
                                name,
                                rules,
                                errorData,
                                ...rest
                              }) {
  const inputProps = rules ? register(name, rules) : register(name);


  const props = {
    name,
    ...inputProps,
    ...rest,
    onChange(e) {
      inputProps?.onChange?.(e);
      rest?.onChange?.(e);
    }
  };

  let element;


  if (props.mask)
    element = InputWithMask(name, control, {...props, errorData});
  else if (isValidElement(as))
    element = cloneElement(as, {...props, errorData});
  else
    element = createElement(as, props);

  return (
    <Fragment>
      {element}
      {error ? <span className="input__error">{error}</span> : null}
      {children}
    </Fragment>
  );
}

function InputWithMask(name, control, props) {
  return (
    <Controller
      name={name}
      control={control}

      rules={props.rules}
      defaultValue={props.defaultValue || props.mask.replace(/9/gi, "_")}

      render={
        ({field: {onChange, value}}) => (
          <InputMask mask={props.mask}
                     alwaysShowMask={props.alwaysShowMask}
                     value={value}
                     onChange={(e) => {
                       onChange(e);
                       if (props.onChange)
                         props.onChange(e);
                     }}>
            {(inputProps) => (
              <input
                {...inputProps}
                className={props.className}
              />
            )}
          </InputMask>
        )}
    />
  );
}

Input.propTypes = {
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType,
    PropTypes.element
  ]),
  children: PropTypes.node,
  register: PropTypes.func,
  error: PropTypes.object,
  name: PropTypes.string.isRequired
};
