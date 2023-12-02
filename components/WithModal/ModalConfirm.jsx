import React from 'react';
import { Center, Button, Heading, Text, VStack } from '@chakra-ui/react';

export function ModalConfirm({ onConfirm, onCancel, text }) {
  return (
    <Center>
      <VStack dir='column' mb={2} spacing={15}>
        <Heading>Tem certeza?</Heading>
        <Text align='center'>{text || 'Essa ação não pode ser desfeita'}</Text>

        <Button
          onClick={() => {
            onConfirm();
            onCancel();
          }}
        >
          Confirmar
        </Button>
      </VStack>
    </Center>
  );
}
