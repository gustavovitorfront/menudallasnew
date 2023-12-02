import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

function StatusStore({ status = 1 }) {
    return (
        <Flex alignItems='center' w='min-content' borderRadius='18.5px' bg={status == 0 ? '#eed3d7' : '#ecfbf3'} padding='0px 10px' h='34px' color={status == 0 ? '#c90000' : '#468847'} fontSize='xs' fontWeight={400}>
            <Box animation='btn-pisca 1s linear infinite' css={`
                        @keyframes btn-pisca {
                            0% { opacity: 0; }
                            50% { opacity: 0.5; }
                            100% { opacity: 1; }
                        }`} mr='7px' w='9px' minW='9px' h='9px' bg={status == 0 ? '#c90000' : '#468847'} borderRadius='50px'></Box>
            <Text>{status == 0 ? 'Fechado' : 'Aberto'}</Text>
        </Flex>
    )
}

export default StatusStore
