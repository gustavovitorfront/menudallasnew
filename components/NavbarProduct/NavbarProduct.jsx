import { Box, Icon, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { MdOutlineArrowBack, MdOutlineWest } from 'react-icons/md'

function NavbarProduct({ productData }) {
    return (
        <Box position='fixed' top={0} padding={['20px 18px', '20px 18px']} w='100%' h='80px' display='flex' alignItems='center' borderBottom='1px solid #CECECE' bg='white' zIndex={999}>
            <Link href='/lista'>
                <Icon fontSize='24px' as={MdOutlineWest} fill='#000' mt='5px' />
            </Link>
            <Text ml='22px' fontSize={['16px', '18px']} color='#000' fontWeight={600} letterSpacing='0.5px'>{productData[0].descricao}</Text>
        </Box>
    )
}

export default NavbarProduct
