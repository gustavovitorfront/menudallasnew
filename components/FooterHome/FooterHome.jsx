import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import moment from 'moment/moment'
import Image from 'next/image'
import React from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'

function FooterHome() {
    return (
        <Box w='100%' bg='primary' padding='30px 60px'>
            <Flex alignItems='center' justifyContent='space-between' flexWrap='wrap'>
                <Flex alignItems='center' justifyContent={['center', 'center', '']} w={['100%', '100%', 'initial']} m={['0px auto', '0px auto', '']} mb={['20px', '20px', '0px']} mt={1}>
                    <Box mr='25px'>
                        <Icon as={FaFacebook} fontSize='21px' fill='white' />
                    </Box>

                    <Box>
                        <Icon as={FaInstagram} fontSize='21px' fill='white' />
                    </Box>
                </Flex>

                <Text fontSize='16px' mb={['20px', '20px', '0px']} w={['100%', '100%', 'initial']} textAlign={['center', 'center', '']} fontWeight='normal' color='white'>
                    {moment().year()} © <Text as='span' fontWeight={600}>Menu Dallas</Text> - Todos os direitos reservados.
                </Text>

                <Box m={['0px auto', '']}>
                    <Image
                        src="/img/logo-white.png"
                        width={90}
                        height={51}
                        objectFit='contain'
                        alt="Menu Dallas"
                    />
                </Box>
            </Flex>
        </Box>
    )
}

export default FooterHome
