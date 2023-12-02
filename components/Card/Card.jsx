import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

const Card = ({ children, ...props }) => (
  <Box
    w='full'
    bg={useColorModeValue('white', 'gray.900')}
    boxShadow='md'
    rounded='lg'
    p={6}
    {...props}
  >
    {children}
  </Box>
);

export default Card;
