import React, { useState } from 'react';
import { Center, Button, Heading, Text, VStack, Input } from '@chakra-ui/react';

export function ModalConfirmWithMessage({ onConfirm, text, placeholder }) {
  const [motive, setMotive] = useState('');

  return (
    <Center>
      <VStack dir='column' mb={2} spacing={15}>
        <Heading>Tem certeza?</Heading>
        <Text align='center'>{text || 'Essa ação não pode ser desfeita'}</Text>

        <Input
          _placeholder={{ textAlign: 'center' }}
          placeholder={placeholder}
          minLength={4}
          value={motive}
          onChange={(e) => setMotive(e.target.value)}
        />

        <Button
          disabled={motive.length <= 4}
          onClick={() => {
            onConfirm(motive);
          }}
        >
          Confirmar
        </Button>
      </VStack>
    </Center>
  );
}
