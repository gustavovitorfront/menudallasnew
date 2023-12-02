import React from 'react';
import NumberFormat from 'react-number-format';

const MoneyInput = ({ defaultValue, placeholder, ...props }) => (
  <NumberFormat
    py={2}
    px={4}
    decimalSeparator=','
    thousandSeparator='.'
    allowNegative={false}
    prefix='R$ '
    defaultValue={defaultValue}
    decimalScale={2}
    fixedDecimalScale
    isNumericString
    {...props}
  />
);

export default MoneyInput;
