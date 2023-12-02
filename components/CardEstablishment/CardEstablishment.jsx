import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import { BsFillStarFill } from 'react-icons/bs'

function CardEstablishment() {
    return (
        <Flex onClick={() => window.location.href = `http://teste.${process.env.NEXT_PUBLIC_BASE_URL_DOMAIN}`} alignItems='center' backgroundColor='#fff' boxShadow='0px 4px 6px 8px rgba(0, 0, 0, 0.00)' borderRadius='22px' w={['100%', '100%', '40%', '24%']} mr={['', '0px', '10%', '1%']} mb={['10px', '10px', '30px']} padding='15px 10px' cursor='pointer' _hover={{
            transition: '0.3s',
            opacity: 0.8
        }}>
            <Image src="/img/estabelecimentoExample.png"
                width={104}
                height={90}
                style={{
                    borderRadius: '5px',
                    height: 90
                }}
                objectFit='cover'
                objectPosition='center'
                alt="Menu Dallas Estabelecimento" />

            <Box ml='13px' w='100%'>
                <Text as='h4' fontSize='16px' fontWeight={400} color='#000'>
                    Face Burguer
                </Text>
                <Flex justifyContent='space-between'>
                    <Flex mb='8px' alignItems='center'>
                        <Icon as={BsFillStarFill} fontSize='xs' fill='#FEAD1D' />
                        <Text fontSize='xs' mt={0.5} ml='4px' color='#FEAD1D' fontWeight={600}>5.0</Text>
                    </Flex>

                    <Flex alignItems='center' borderRadius='18.5px' bg='#eed3d7' padding='0px 10px' h='25px' color='#c90000' fontSize='10px' fontWeight={400}>
                        <Box animation='btn-pisca 1s linear infinite' css={`
                        @keyframes btn-pisca {
                            0% { opacity: 0; }
                            50% { opacity: 0.5; }
                            100% { opacity: 1; }
                        }`} mr='7px' w='7px' h='7px' bg='#c90000' borderRadius='50px'></Box>
                        <Text>Fechado</Text>
                    </Flex>
                </Flex>
                <Text fontSize='xs' color='#000' fontWeight={400}>Hamburgueria</Text>
                <Flex justifyContent='space-between' w='100%' mt='9px'>
                    <Text fontSize='xs' fontWeight={400} color='#979797'>40 - 50 min</Text>
                    <Text fontSize='xs' fontWeight={400} color='primary'>1.7km</Text>
                </Flex>
            </Box>
        </Flex>
    )
}

export default CardEstablishment
