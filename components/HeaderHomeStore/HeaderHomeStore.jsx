import { Box } from '@chakra-ui/react'
import React from 'react'

function HeaderHomeStore({ data }) {
    return (
        <Box w='100%' bgImage={data?.capa ? 'url("/img/' + data?.capa + '")' : ''}
            bg={!data?.capa && data?.accent_color}
            minH={['220px', '370px']} backgroundSize={['cover', '']}></Box>
    )
}

export default HeaderHomeStore
