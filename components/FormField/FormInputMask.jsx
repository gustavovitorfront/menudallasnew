import React from 'react';
import { Input } from '@chakra-ui/react';
import InputMask from 'react-input-mask';

const FormInputMask = ({
  placeholder,
  type,
  field,
  mask,
  maskChar,
  beforeMaskedValueChange,
  ...props
}) => {
  const value = field.value || '';

  const handleKeyPress = (event) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(event.key))) {
      // eslint-disable-next-line no-param-reassign
      event.target.dir = 'ltr';
    }
  };

  return (
    <InputMask
      alwaysShowMask={false}
      mask={mask}
      maskChar={maskChar || null}
      beforeMaskedValueChange={beforeMaskedValueChange}
      value={value}
      dir='ltl'
      onChange={(e) => {
        e.target.dir = 'ltr';
        field.onChange(e);
        if (props.onChange && typeof props.onChange === 'function') {
          props.onChange(e);
        }
      }}
    >
      {(inputProps) => (
        <Input
          id={field.name}
          {...inputProps}
          type={type}
          value={value}
          dir='ltl'
        />
      )}
    </InputMask>
  );
};

export default FormInputMask;
