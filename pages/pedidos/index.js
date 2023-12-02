import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { isLogged } from '../../utils/auth';
import Head from 'next/head';
import { Layout } from '../../components/Layout';
import { NavbarOrder } from '../../components/NavbarOrder';
import { Container } from '@chakra-ui/react';
import { PedidoContext } from '../../components/PedidoContext';

function Pedidos() {
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
            </Head>

            <Layout isOnlySubdomain>
                {({ subdomain, data }) => (
                    <>
                        <Head>
                            <link rel="shortcut icon" href={data?.logo_home} />
                        </Head>

                        <NavbarOrder text='Pedidos' data={data} linkBack='/perfil' />

                        <Container maxW='100%' centerContent mt={['105px', '100px']} mb='30px'>
                            <PedidoContext data={data} subdomain={subdomain} />
                        </Container>
                    </>)}
            </Layout >
        </>
    )
}

export default Pedidos;
