import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { isLogged } from '../../utils/auth';
import Head from 'next/head';
import { NavbarOrder } from '../../components/NavbarOrder';
import { Container } from '@chakra-ui/react';
import { PedidoContext } from '../../components/PedidoContext';

function Pedidos({ data, subdomain }) {
    const router = useRouter();

    useEffect(() => {
        if (!isLogged) {
            router.push('/perfil');
        }
    }, [isLogged]);

    return (
        <>
            <Head>
                <title>Pedidos</title>
                <link rel="shortcut icon" href={data?.logo_home} />
            </Head>

            <NavbarOrder text='Pedidos' data={data} linkBack='/perfil' />

            <Container maxW='100%' centerContent mt={['105px', '100px']} mb='30px'>
                <PedidoContext data={data} subdomain={subdomain} />
            </Container>
        </>
    )
}

export async function getServerSideProps(context) {
    const subdomain = context.req.headers.host.split('.')[0];

    if (subdomain != process.env.NEXT_PUBLIC_BASE_URL_DOMAIN) {
        try {
            const response = await fetch(`https://api.edenerp.com.br:8081/home?empresa=${subdomain}`);
            const data = await response.json();

            return {
                props: {
                    data: data[0],
                    subdomain
                },
            };
        } catch (error) {
            return {
                props: {
                    data: {},
                    subdomain: ''
                },
            };
        }
    } else {
        return {
            redirect: {
                destination: process.env.NEXT_PUBLIC_BASE_URL,
                permanent: false,
            },
        };
    }
}

export default Pedidos;
