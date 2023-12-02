import { Box } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../Navbar/Navbar';
import HeaderHomeStore from '../HeaderHomeStore/HeaderHomeStore';
import InfoStoreHome from '../InfoStoreHome/InfoStoreHome';
import Head from 'next/head';

function HomeStore({ data, subdomain }) {

    return (
        <>
            <Head>
                <title>{data?.nome}</title>
                <link rel="shortcut icon" href={data?.logo_home} />
                <style>
                    {`
                        body {
                            background: white !important;
                        }
                    `}
                </style>
            </Head>

            <Box pt='88px'>
                <Navbar isHome={false} />
                <HeaderHomeStore data={data} />
                <InfoStoreHome data={data} subdomain={subdomain} />
            </Box>
        </>
    )
}

export default HomeStore;
