import React from 'react';
import { Input } from '@chakra-ui/react';

const FormInput = ({ placeholder, type, field }) => {
  const value = field.value || '';
  return <Input id={field.name} {...field} type={type} value={value} />;
};

export default FormInput;
