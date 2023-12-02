import { Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { moneyFormat } from '../../utils/moneyFormat';

function FooterStore({ data, subdomain }) {
    const [bag, setBag] = useState([]);
    const [total, setTotal] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const b = localStorage.getItem("@menu-digital:" + subdomain + ":bag")

        if (b !== null) {
            setBag(JSON.parse(b))

            if (JSON.parse(b).length > 0) {
                let cont = 0
                JSON.parse(b).forEach(element => {
                    cont = cont + (element.valor_total * element.quantidade)
                });
                setTotal(cont)
            }
        }
    }, [subdomain])
    
    return (
        <Flex onClick={() => bag !== null && bag.length > 0 ? router.push('/meu-pedido') : false} cursor={bag !== null && bag.length > 0 && 'pointer'} padding={['12px 30px', '12px 50px']} h='80px' bg={bag !== null && bag.length > 0 ? data?.primary_color : '#b7b7b7'} w='100%' position='fixed' bottom='0px' alignItems='center' justifyContent='space-between' borderTop='1px solid #CECECE'>
            <Box position='relative' mt='7px'>
                <Box top={['0', '1']} right={['-5', '-4']} position='absolute' borderRadius='3px' bg='white' minW='22px' h='20px' fontSize='12px' display='flex' alignItems='center' justifyContent='center'>{bag.length}</Box>
                <Image
                    src="/img/shopIcon.png"
                    width={37}
                    height={40}
                    objectFit='cover'
                    objectPosition='center'
                    alt="Menu Dallas Vetor"
                />
            </Box>

            <Text fontSize={['14px', '18px']} fontWeight={600} color='white'>Meu pedido</Text>

            <Box>
                <Text fontSize={['14px', '18px']} fontWeight={600} color='white'>{moneyFormat.format(total)}</Text>
            </Box>
        </Flex>
    )
}

export default FooterStore
