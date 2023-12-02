import React from 'react';
import { Select, Spinner } from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';

const FormSelect = ({ field, type, children, required, isLoading = false }) => (
  <Select
    id={field.name}
    type={type}
    value={field.value !== undefined ? field.value : ''}
    onChange={field.onChange}
    disabled={isLoading}
    placeholder={!required && 'Selecione...'}
    icon={
      isLoading ? (
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
        />
      ) : (
        <MdArrowDropDown />
      )
    }
  >
    {required && (
      <option hidden disabled value=''>
        Selecione...
      </option>
    )}

    {children}
  </Select>
);

export default FormSelect;
