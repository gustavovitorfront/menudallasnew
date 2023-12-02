import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { MdOutlineArrowBack, MdOutlineWest } from 'react-icons/md'

function NavbarOrder({ data, text = 'Meu pedido', linkBack = '/lista', handleOrder }) {
    return (
        <Box position='fixed' zIndex={5} justifyContent='space-between' top={0} padding={['20px 18px', '20px 18px']} w='100%' h='80px' display='flex' alignItems='center' borderBottom='1px solid #CECECE' bg='white'>
            <Flex alignItems='center'>
                <Link href={linkBack}>
                    <Icon fontSize='24px' as={MdOutlineWest} fill='#000' mt='5px' />
                </Link>
                <Text ml='22px' fontSize={['16px', '18px']} color='#000' fontWeight={600} letterSpacing='0.5px'>{text}</Text>
            </Flex>

            {text === 'Meu pedido' && (
                <Button variant='transparent' bg={data?.primary_color} borderRadius='36px' fontSize={['13px', '20px']} color='white' p={['12px 16px', '25px 30px']} onClick={handleOrder}>FINALIZAR PEDIDO</Button>
            )}
        </Box>
    )
}

export default NavbarOrder
