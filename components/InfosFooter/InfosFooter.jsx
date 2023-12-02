import { Box, Button, Container, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

function InfosFooter() {
    return (
        <Box w='100%' bg='#F3F3F3' mt={['40px', '40px', '60px']} padding={['30px', '30px', '43px 68px']}>
            <Container maxW={['100%', '100%', '8xl']}>
                <Flex justifyContent='space-between' flexWrap='wrap'>
                    <Flex w={['100%', '100%', 'initial']} alignItems='center' flexWrap='wrap'>
                        <Box m={['0px auto', '0px auto', '']}>
                            <Image src="/img/vector3.png"
                                width={149}
                                height={209}
                                objectFit='contain'
                                objectPosition='center'
                                alt="Menu Dallas - Tenha já seu cardápio digital" />
                        </Box>

                        <Box w={['100%', '100%', 'initial']} maxW={['100%', '100%', '254px']} ml={['0px', '0px', '40px']} mt={['30px', '30px', '']}>
                            <Text color='#313131' fontWeight={600} letterSpacing='0.5px' fontSize='28px' lineHeight='32px'>Tenha já seu cardápio digital</Text>

                            <Text mb='21px' color='#979797' fontSize='sm' mt='12px'>Cardápio online, delivery e muito mais</Text>

                            <Button variant='btnDallas' borderRadius='15px' color='#fff' h='57px' minW={['100%', '100%', '175px']} fontWeight={600} _hover={{
                                transition: '0.3s',
                                opacity: 0.9
                            }}>Saiba mais</Button>
                        </Box>
                    </Flex>

                    <Flex w={['100%', '100%', 'initial']} alignItems='center' flexWrap='wrap' mt={['30px', '']}>
                        <Box m={['0px auto', '0px auto', '']}>
                            <Image src="/img/vector4.png"
                                width={246}
                                height={200}
                                objectFit='contain'
                                objectPosition='center'
                                alt="Menu Dallas - Tenha já seu cardápio digital" />
                        </Box>

                        <Box w={['100%', '100%', 'initial']} maxW={['100%', '100%', '254px']} ml={['0px', '0px', '40px']} mt={['30px', '30px', '']}>
                            <Text color='#313131' fontWeight={600} letterSpacing='0.5px' fontSize='28px' lineHeight='32px'>Conheça já o sistema PDV!</Text>

                            <Text mb='21px' color='#979797' fontSize='sm' mt='12px'>Um sistema PDV pensado para seu delivery.</Text>

                            <Button variant='btnDallas' borderRadius='15px' color='#fff' h='57px' minW={['100%', '100%', '175px']} fontWeight={600} _hover={{
                                transition: '0.3s',
                                opacity: 0.9
                            }}>Saiba mais</Button>
                        </Box>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    )
}

export default InfosFooter
