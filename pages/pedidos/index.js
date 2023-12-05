import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { isLogged } from '../../utils/auth';
import Head from 'next/head';
import { NavbarOrder } from '../../components/NavbarOrder';
import { Container } from '@chakra-ui/react';
import { PedidoContext } from '../../components/PedidoContext';
import url from 'url';

function Pedidos({ data, subdomain }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [data, subdomain]);
    
    const router = useRouter();

    useEffect(() => {
        if (!isLogged) {
            router.push('/perfil');
        }
    }, [isLogged]);

    return !loading && (
        <>
            <Head>
                <title>Pedidos</title>
                <link rel="shortcut icon" href={data?.logo_home} />
                <meta property="og:title" content={data?.nome} />
                <meta property="og:description" content={data?.frase_home || data?.nome} />
                <meta property="og:image" content={data?.logo_home} />
                <meta name="description" content={data?.frase_home || data?.nome} />
                <meta name="twitter:title" content={data?.nome} />
                <meta name="twitter:description" content={data?.frase_home || data?.nome} />
                <meta name="twitter:image" content={data?.logo_home} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <NavbarOrder text='Pedidos' data={data} linkBack='/perfil' />

            <Container maxW='100%' centerContent mt={['105px', '100px']} mb='30px'>
                <PedidoContext data={data} subdomain={subdomain} />
            </Container>
        </>
    )
}

export async function getServerSideProps(context) {
    const host = context.req.headers['x-forwarded-host'] || context.req.headers.host;
    const subdomain = url.parse(`https://${host}`).hostname.split('.')[0];

    if (subdomain != process.env.NEXT_PUBLIC_BASE_URL_NAME_BASE_DOMAIN) {
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
