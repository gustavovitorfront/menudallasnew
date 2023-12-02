import React from 'react'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'
import { OrderContext } from '../../components/OrderContext'

function meuPedido() {
    return (
        <>
            <Head>
                <title>Meu Pedido</title>
            </Head>

            <Layout isOnlySubdomain>
                {({ subdomain, data }) => (
                    <>
                        <Head>
                            <link rel="shortcut icon" href={data?.logo_home} />
                        </Head>

                        <OrderContext data={data} subdomain={subdomain} />
                    </>
                )}
            </Layout>
        </>
    )
}

export default meuPedido
