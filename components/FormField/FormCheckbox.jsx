import { Checkbox, Text } from '@chakra-ui/react';
import React from 'react';

const FormCheckbox = ({
  type,
  field,
  onKeyPress,
  label,
  defaultChecked = false,
  onChangeHandle,
}) => {
  return (
    <Checkbox
      defaultChecked={defaultChecked}
      isChecked={field.checked}
      id={field.name}
      {...field}
      type={type}
      onKeyPress={onKeyPress && onKeyPress}
      fontSize='xs'
      colorScheme='redbelt.checkbox'
      color='redbelt.black.600'
      size='lg'
      onChange={(e) => {
        if(onChangeHandle != undefined){
          return onChangeHandle(e)
        }
        
        return field.onChange(e);
      }}
    >
      <Text fontSize='xs' color='redbelt.black.800'>
        {label != undefined && label}
      </Text>
    </Checkbox>
  );
};

export default FormCheckbox;
