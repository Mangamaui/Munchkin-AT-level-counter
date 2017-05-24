let React =  require('react');
let CustomButton = require('./CustomButton');

const SquareButton = (otherProps) => (
  <CustomButton button_class={otherProps.button_class}
    background={false}
    button_handler={otherProps.button_handler}
    button_text={otherProps.button_text}
    disabled={otherProps.disabled}>
    {otherProps.children}
  </CustomButton>
);

module.exports =  SquareButton;
