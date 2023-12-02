import { Box, Button, Flex, Icon, Text, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { GrSubtract } from 'react-icons/gr'
import { moneyFormat } from '../../utils/moneyFormat'

function FooterProduct({ data, opened, total, setCount, setTotal, count, totalUnity, handleItemOrder, disable }) {
    const toast = useToast();

    return (
        <Box position='fixed' bottom={0} padding={['20px 20px', '20px 100px']} w='100%' h='100px' display='flex' alignItems='center' borderTop='1px solid #CECECE' bg='white'>
            {!opened ? (
                <Box justifySelf='center' justifyContent='center' margin='0px auto'>
                    <Text fontSize='16px' fontWeight={600} textAlign='center'>Fechado no momento!</Text>
                    <Text fontSize='14px' textAlign='center'>No momento, não estamos aceitando novos pedidos.</Text>
                </Box>
            ) : (
                <Flex w='100%' justifyContent='space-between' alignItems='center'>
                    <Flex alignItems='center' w={['100px', '162px']} justifyContent='space-between' borderRadius='30.5px' border='1px solid #CECECE' p={['10px', '17px']}>
                        <Button onClick={() => {
                            if (count > 1) {
                                setCount(count - 1)
                                setTotal(totalUnity * (count - 1))
                            }
                        }} variant='transparent' w={['18px', '27px']} h={['18px', '27px']}>
                            <Icon as={GrSubtract} />
                        </Button>

                        <Text fontSize={['14px', '16px']} fontWeight={400} color='#000'>{count}</Text>

                        <Button onClick={() => {
                            setCount(count + 1)
                            setTotal(totalUnity * (count + 1))
                        }} variant='transparent' w={['18px', '27px']} h={['18px', '27px']}>
                            <Icon as={BsPlusLg} />
                        </Button>
                    </Flex>
                    <Text fontSize={['18px', '23px']} color={data?.primary_color} fontWeight={600} letterSpacing='0.5px'>{moneyFormat.format(total)}</Text>
                    <Button variant='transparent' bg={disable ? "#485460" : (data?.primary_color ? data?.primary_color : "#1e90ff")} borderRadius='36px' color='#fff' fontWeight={700} fontSize={['15px', '20px']} textTransform='uppercase' padding={['20px', '25px 36px']} transition='0.3s' _hover={{
                        opacity: 0.8
                    }} onClick={() => disable ? toast({
                        title: 'Alerta',
                        description: 'Preencha todos os campos obrigatórios',
                        status: 'warning',
                        duration: 2000,
                        isClosable: true,
                        position: 'top-center'
                    }) : handleItemOrder()} >Adicionar</Button>
                </Flex>
            )
            }
        </Box >
    )
}

export default FooterProduct
