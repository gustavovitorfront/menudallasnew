import React from 'react'

import Head from 'next/head'
import { OrderContext } from '../../components/OrderContext'

function meuPedido({ data, subdomain }) {
    return (
        <>
            <Head>
                <title>Meu Pedido</title>
                <link rel="shortcut icon" href={data?.logo_home} />
            </Head>

            <OrderContext data={data} subdomain={subdomain} />
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

export default meuPedido
