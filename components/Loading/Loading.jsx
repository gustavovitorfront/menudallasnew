import React from 'react'
import { Flex, Spinner } from '@chakra-ui/react'

function Loading({ fullpage = true, maxHeight }) {
    return (
        <Flex justifyContent='center' alignItems='center' h={fullpage ? '100vh' : maxHeight}>
            <Spinner size='xl' thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
            />
        </Flex>
    )
}

export default Loading
