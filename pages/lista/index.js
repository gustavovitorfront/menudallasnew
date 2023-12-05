import React, { useState } from 'react'

import Navbar from '../../components/Navbar/Navbar'
import HeaderHomeStore from '../../components/HeaderHomeStore/HeaderHomeStore'
import InfoStoreHome from '../../components/InfoStoreHome/InfoStoreHome'
import Head from 'next/head'
import { MenuOptionsStore } from '../../components/MenuOptionsStore'
import { MainProducts } from '../../components/MainProducts'
import { ProductsList } from '../../components/ProductsList'
import { FooterStore } from '../../components/FooterStore'
import { Box } from '@chakra-ui/react'

function lista({ data, subdomain }) {
    const [refreshSearch, setRefreshSearch] = useState(true);

    return (
        <>
            <Head>
                <title>{data?.nome}</title>
                <link rel="shortcut icon" href={data?.logo_home} />
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

export default lista
