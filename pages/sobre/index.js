import Head from 'next/head'
import React from 'react'
import Layout from '../../components/Layout/Layout'
import { NavbarOrder } from '../../components/NavbarOrder'
import { Box, Container, Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { BsClockFill } from 'react-icons/bs'
import { MdAttachMoney, MdPercent } from 'react-icons/md'
import { FormasPgBox } from '../../components/FormasPgBox'

function Sobre() {
    return (
        <>
            <Head>
                <title>Sobre a loja</title>
            </Head>

            <Layout isOnlySubdomain>
                {({ subdomain, data }) => (
                    <>
                        <Head>
                            <link rel="shortcut icon" href={data?.logo_home} />
                        </Head>

                        <NavbarOrder text='Sobre a loja' data={data} />

                        <Container maxW='100%' centerContent mt={['105px', '100px']} mb='30px'>
                            <Box w='100%'>
                                <Flex alignItems='center' gap='5px' fontSize='20px' >
                                    <BsClockFill color={data?.primary_color} />
                                    <Text color={data?.primary_color} fontWeight={600}>Horário de funcionamento</Text>
                                </Flex>

                                <UnorderedList ml='45px' mt='10px'>
                                    {data?.abre_domingo &&
                                        <ListItem fontSize='14px' fontWeight={500}>Domingo {data?.hora_abre}h às {data?.hora_fecha}h</ListItem>
                                    }
                                    {data?.abre_segunda &&
                                        <ListItem fontSize='14px' fontWeight={500}>Segunda {data?.hora_abre}h às {data?.hora_fecha}h</ListItem>
                                    }
                                    {data?.abre_terca &&
                                        <ListItem fontSize='14px' fontWeight={500}>Terça {data?.hora_abre}h às {data?.hora_fecha}h</ListItem>
                                    }
                                    {data?.abre_quarta &&
                                        <ListItem fontSize='14px' fontWeight={500}>Quarta {data?.hora_abre}h às {data?.hora_fecha}h</ListItem>
                                    }
                                    {data?.abre_quinta &&
                                        <ListItem fontSize='14px' fontWeight={500}>Quinta {data?.hora_abre}h às {data?.hora_fecha}h</ListItem>
                                    }
                                    {data?.abre_sexta &&
                                        <ListItem fontSize='14px' fontWeight={500}>Sexta {data?.hora_abre}h às {data?.hora_fecha}h</ListItem>
                                    }
                                    {data?.abre_sabado &&
                                        <ListItem fontSize='14px' fontWeight={500}>Sábado {data?.hora_abre}h às {data?.hora_fecha}h</ListItem>
                                    }
                                </UnorderedList>

                                <Flex alignItems='center' gap='5px' fontSize='20px' mt='30px'>
                                    <MdAttachMoney color={data?.primary_color} fontSize='24px' />
                                    <Text color={data?.primary_color} fontWeight={600}>Formas de pagamento</Text>
                                </Flex>

                                <FormasPgBox subdomain={subdomain} data={data} />

                                <Flex alignItems='center' gap='5px' fontSize='20px' mt='30px'>
                                    <MdPercent color={data?.primary_color} fontSize='24px' />
                                    <Text color={data?.primary_color} fontWeight={600}>Cupons</Text>
                                </Flex>
                            </Box>
                        </Container>
                    </>
                )}
            </Layout>
        </>
    )
}

export default Sobre