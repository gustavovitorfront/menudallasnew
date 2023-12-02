import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const EmptyResult = () => (
  <Box textAlign='center' py={10} px={6}>
    <Heading
      display='inline-block'
      as='h2'
      size='2xl'
      bgGradient='linear(to-r, blue.400, blue.700)'
      backgroundClip='text'
    >
      404
    </Heading>
    <Text fontSize='18px' mt={3} mb={2}>
      Não encontrado
    </Text>
    <Text color='gray.500' mb={6}>
      O registro que você esta procurando parece não existir
    </Text>
  </Box>
);

export default EmptyResult;
