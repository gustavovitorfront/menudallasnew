import React, { useEffect, useState } from 'react'

import Navbar from '../../components/Navbar/Navbar'
import HeaderHomeStore from '../../components/HeaderHomeStore/HeaderHomeStore'
import InfoStoreHome from '../../components/InfoStoreHome/InfoStoreHome'
import Head from 'next/head'
import { MenuOptionsStore } from '../../components/MenuOptionsStore'
import { MainProducts } from '../../components/MainProducts'
import { ProductsList } from '../../components/ProductsList'
import { FooterStore } from '../../components/FooterStore'
import { Box } from '@chakra-ui/react'
import url from 'url';

function lista({ data, subdomain }) {
    const [loading, setLoading] = useState(true);
    const [refreshSearch, setRefreshSearch] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [data, subdomain]);

    return !loading && (
        <>
            <Head>
                <title>{data?.nome}</title>
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

            <Navbar isHome={false} hasSearch={true} setRefreshSearch={setRefreshSearch} />

            <Box id='header'>
                <HeaderHomeStore data={data} />
                <InfoStoreHome type={2} data={data} subdomain={subdomain} />
                <MenuOptionsStore data={data} subdomain={subdomain} />
            </Box>
            <MainProducts data={data} subdomain={subdomain} refreshSearch={refreshSearch} setRefreshSearch={setRefreshSearch} />
            <ProductsList data={data} />
            <FooterStore data={data} subdomain={subdomain} />
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

export default lista
